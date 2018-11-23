import { VueConstructor } from "vue";
import { Vue, Component } from "vue-property-decorator";

function isBeforeInstallPromptEvent(
  event: Event
): event is BeforeInstallPromptEvent {
  return "prompt" in event;
}

@Component
export class PWAInstallMixin extends Vue {
  mounted() {
    if (typeof window !== undefined) {
      const beforeInstallPromptHandler = (event: Event) => {
        if (isBeforeInstallPromptEvent(event)) {
          this.$emit("canInstall", event);
        }
      };

      window.addEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener(
          "obeforeinstallpromptnline",
          beforeInstallPromptHandler
        );
      });
    }
  }
}

export default {
  install(Vue: VueConstructor, options = {}) {
    Vue.mixin(PWAInstallMixin);
  }
};
