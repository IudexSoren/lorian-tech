import * as CodigoCambioClaveRepo from '../../repositories/usuarios/CodigoCambioClaveRepo.js';
import * as UsuarioRepo from '../../repositories/usuarios/UsuariosRepo.js';
import * as CodigoCambioClaveModel from '../../models/usuarios/CodigoCambioClaveModels.js';
import BadRequestException from "../../config/exceptions/BadRequestException.js";
import NotFoundException from "../../config/exceptions/NotFoundException.js";
import ServerException from "../../config/exceptions/ServerException.js";
import successfulResponse from "../../config/responses/successfulResponse.js";
import validateSchema from "../../helpers/joiValidationsHelper.js";
import { mysqlDateFormat } from '../../helpers/DatesHelper.js';
import * as ENTITIES_STATES from '../../constants/ENTITIES_STATES.js';

export const insertCodigoCambioClave = async (payload) => {
  try {
    const validationResult = validateSchema(CodigoCambioClaveModel.insertCodigoCambioClave, payload);
    if (!validationResult.isValid) throw new BadRequestException();

    const { expira } = payload;
    delete payload.expira;
    const usuario = await UsuarioRepo.getUsuario(payload);
    if (!usuario)
      throw new BadRequestException();

    if (usuario.idEstadoUsuario === ENTITIES_STATES.BLOQUEADO)
      throw new BadRequestException('No se permite la generación de códigos para el cambio de contraseña en cuentas desactivadas o bloqueadas', 'Acción prohibida');

    const idUsuario = usuario.id;
    const codigo = generdorCodigo(idUsuario);

    const fechaCreacion = mysqlDateFormat();

    // Invalidar cualquier otro código del usuario
    await CodigoCambioClaveRepo.updateDisponiblesCodigoCambioClaveByUsuario(idUsuario);
    await CodigoCambioClaveRepo.insertCodigoCambioClave({
      idUsuario,
      codigo,
      fechaCreacion,
      expira
    });

    const codigoGenerado = await CodigoCambioClaveRepo.getCodigoCambioClave({ idUsuario, codigo });

    return successfulResponse(codigoGenerado, 'Nuevo código generado', `Se ha generado un nuevo código de cambio de contraseña para el usuario ${usuario.nombreUsuario}`);
  } catch (error) {
    throw error;
  }
}

export const isCodigoValido = async (payload) => {
  try {
    const validationResult = validateSchema(CodigoCambioClaveModel.isCodigoValido, payload);
    if (!validationResult.isValid) throw new BadRequestException();

    if (payload.codigo.length !== 10) throw new BadRequestException('El código digitado es inválido', 'Código inválido');

    const codigo = await CodigoCambioClaveRepo.getCodigoCambioClaveByCodigo(payload.codigo);
    if (!codigo) throw new BadRequestException('El código digitado es inválido', 'Código inválido');

    if (!codigo.disponible) throw new BadRequestException('El código digitado es inválido', 'Código inválido');

    const fechaVencimiento = codigo.fechaCreacion;
    fechaVencimiento.setMinutes(codigo.fechaCreacion.getMinutes() + 30);
    if (codigo.expira && fechaVencimiento.getTime() < new Date().getTime()) {
      await CodigoCambioClaveRepo.updateDisponibleCodigoCambioClave({ codigo: codigo.codigo });

      throw new BadRequestException('El código digitado es inválido', 'Código inválido');
    }

    if (codigo.idUsuario !== parseInt(payload.idUsuario)) {
      await CodigoCambioClaveRepo.updateIntentosCodigoCambioClave(codigo.codigo);
      if (codigo.intentos === 2) {
        await CodigoCambioClaveRepo.updateDisponibleCodigoCambioClave({ codigo: codigo.codigo });

        throw new BadRequestException('El código ha sido invalidado debido a varios intentos fallidos', 'Código invalidado');
      }

      throw new BadRequestException('El código digitado es inválido', 'Código inválido');
    }

    const codigoIdUsuario = codigo.codigo.slice((codigo.codigo.length - 1) - (codigo.idUsuario.toString().length - 1));
    if (parseInt(codigoIdUsuario) !== parseInt(payload.idUsuario)) {
      await CodigoCambioClaveRepo.updateIntentosCodigoCambioClave(codigo.codigo);

      if (codigo.intentos === 2) {
        await CodigoCambioClaveRepo.updateDisponibleCodigoCambioClave({ codigo: codigo.codigo });

        throw new BadRequestException('El código ha sido invalidado debido a varios intentos fallidos', 'Código invalidado');
      }

      throw new BadRequestException('El código digitado es inválido', 'Código inválido');
    }
  } catch (error) {
    throw error;
  }
}

export const usarCodigo = async (codigo) => {
  try {
    if (!await CodigoCambioClaveRepo.getCodigoCambioClaveByCodigo(codigo))
      throw new BadRequestException('El código digitado es inválido', 'Código inválido');

    const fechaUso = mysqlDateFormat();
    await CodigoCambioClaveRepo.updateDisponibleCodigoCambioClave({
      codigo, fechaUso
    });
  } catch (error) {
    throw error;
  }
}

export const generdorCodigo = (idUsuario) => {
  try {
    const VALID_CHARACTERS = 'abc9defAB8CDEghi7FGHjkl6IJKlmn5LMNopq4OPQrst3RSTuvw2UVWxyz1XYZ0';

    let codigo = '';
    while (codigo.length + idUsuario.toString().length < 10) {
      const randomIndex = Math.floor(Math.random() * ((VALID_CHARACTERS.length) - 0)) + 0;
      codigo += VALID_CHARACTERS[randomIndex];
    }
    codigo += idUsuario;

    return codigo;
  } catch (error) {
    throw error;
  }
}