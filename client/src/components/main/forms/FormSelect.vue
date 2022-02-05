<template>
  <div>
    <!-- LABEL -->
    <label class="form-label" v-if="input.label" @click="onToggleShow">{{
      input.label
    }}</label>
    <!-- LABEL -->
    <div
      class="form-select relative"
      tabindex="0"
      :id="formSelect"
      @blur="onBlurFormSelect"
    >
      <!-- OPTION SELECTED -->
      <div
        class="form-select-selected"
        @click="onToggleShow"
        :class="show && 'open'"
      >
        <span :class="selectedOptionProp.data.value === '' && 'text-gray-400'">
          {{ selectedOptionProp.data.name }}
        </span>
        <i class="fas fa-caret-down"></i>
      </div>
      <!-- OPTION SELECTED -->
      <!-- TRANSITION -->
      <transition name="fade" mode="out-in">
        <!-- OPTIONS LIST -->
        <ul
          class="
            w-full
            bg-dark-gray
            border
            rounded
            border-gray-700
            p-1
            absolute
            shadow
            max-h-40
            overflow-auto
            z-10
          "
          v-if="show"
        >
          <!-- DEFAULT OPTION -->
          <li
            class="p-1 cursor-pointer rounded text-white-75"
            @click="onSelectOption({ ...selectedOptionInitialState })"
            v-if="input.showPlaceholder"
          >
            {{ selectedOptionInitialState.name }}
          </li>
          <!-- DEFAULT OPTION -->
          <!-- NORMAL OPTION -->
          <li
            v-for="option in OPTIONS"
            :key="option.value"
            class="p-1 cursor-pointer rounded"
            @click="onSelectOption(option)"
          >
            {{ option.name }}
          </li>
          <!-- NORMAL OPTION -->
        </ul>
        <!-- OPTIONS LIST -->
      </transition>
      <!-- TRANSITION -->
    </div>
    <!-- ERROR MESSAGE -->
    <transition name="fade" mode="out-in">
      <small class="form-error-message" v-if="errorMessage">
        {{ errorMessage }}
      </small>
    </transition>
    <!-- ERROR MESSAGE -->
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watch, computed } from "vue";
import { v4 as uuidv4 } from "uuid";

const emit = defineEmits(["on-value-changed"]);

const formSelect = uuidv4();

// Properties
const props = defineProps({
  inputInfo: {
    type: Object,
    required: true,
  },
  selectedOption: {
    type: Object,
  },
  defaultOption: {
    type: undefined,
  },
  OPTIONS: {
    type: Array,
    required: true,
  },
  errorMessage: {
    type: String,
  },
});

// Initial states
const selectedOptionInitialState = {
  value: "",
  name: "- Seleccionar -",
};

const inputInitialState = {
  index: props.inputInfo.index,
  label: props.inputInfo.label,
  labelFor: props.inputInfo.labelFor,
  showPlaceholder: props.inputInfo.showPlaceholder,
};

// Refs
const input = ref({ ...inputInitialState });
const selectedOptionProp = computed(() => ({
  data: props.selectedOption ? props.selectedOption : { ...inputInitialState },
}));
const show = ref(false);

// Hooks
onMounted(() => {
  getDefaultOption();
});

watch(props, () => {
  getDefaultOption();
});

// Functions
const onToggleShow = () => {
  show.value = !show.value;
  setTimeout(() => {
    if (show.value) {
      const formSelectElement = document.getElementById(formSelect);
      formSelectElement.focus();
    }
  }, 150);
};

const onBlurFormSelect = () => {
  show.value = false;
};

const onSelectOption = (newSelectedOption) => {
  onBlurFormSelect();
  selectedOptionProp.value.data = newSelectedOption;
  emit("on-value-changed", {
    index: input.value.index,
    value: newSelectedOption.value,
  });
};

const getDefaultOption = () => {
  if (props.OPTIONS.length) {
    for (const option of props.OPTIONS) {
      if (!props.defaultOption) {
        selectedOptionProp.value.data = { ...selectedOptionInitialState };
      } else {
        selectedOptionProp.value.data =
          option.value === props.defaultOption ? option : null;
      }

      if (selectedOptionProp.value.data) break;
    }
  } else {
    selectedOptionProp.value.data = { ...selectedOptionInitialState };
  }
};
</script>

<style scoped>
/* FADE SLIDE UP */

.fade-slide-up-enter-from {
  opacity: 0.5;
  transform: translateY(-10%);
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: transform linear 0.2s, opacity linear 0.1s;
}

.fade-slide-up-enter,
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}

/* FINAL FADE SLIDE UP */
</style>
