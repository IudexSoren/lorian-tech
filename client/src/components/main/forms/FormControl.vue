<template>
  <div :class="input.classes">
    <label v-if="input.label" :for="input.labelFor" class="form-label">{{
      input.label
    }}</label>
    <input
      v-model="value"
      :type="input.type"
      :id="input.labelFor"
      :placeholder="input.placeholder"
      @keyup="onTextChange"
      class="form-control"
      autocomplete="off"
      spellcheck="false"
      v-if="input.type !== 'textarea'"
    />
    <textarea
      v-model="value"
      :id="input.labelFor"
      :placeholder="input.placeholder"
      @keyup="onTextChange"
      class="form-control"
      v-else
    ></textarea>
    <transition name="fade" mode="out-in">
      <small class="form-error-message" v-if="errorMessage">
        {{ errorMessage }}
      </small>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const emit = defineEmits(["on-value-changed"]);

const inputInitialState = {
  index: props.inputInfo.index,
  label: props.inputInfo.label,
  labelFor: props.inputInfo.labelFor,
  type: props.inputInfo.type,
  placeholder: props.inputInfo.placeholder,
  classes: props.inputInfo.classes,
};

const props = defineProps({
  inputInfo: {
    type: Object,
    required: true,
  },
  errorMessage: {
    type: String,
  },
  value: {
    type: String,
  },
});

const input = ref({ ...inputInitialState });

const onTextChange = async () => {
  emit("on-value-changed", {
    index: input.value.index,
    value: props.value,
  });
};

watch(props, () => {
  input.value = { ...props.inputInfo };
});
</script>
