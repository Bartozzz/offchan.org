import { Vue, Component } from "vue-property-decorator";

@Component
export class InstallPrompt extends Vue {
  deferredPrompt?: Event;

  get canShowInstallPrompt() {
    return Boolean(this.deferredPrompt);
  }

  onBeforeInstallPrompt(event: Event) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt:
    event.preventDefault();
    event.stopPropagation();

    this.deferredPrompt = event;
  }

  created() {
    window.addEventListener(
      "beforeinstallprompt",
      this.onBeforeInstallPrompt.bind(this)
    );
  }

  beforeDestroy() {
    window.removeEventListener(
      "beforeinstallprompt",
      this.onBeforeInstallPrompt.bind(this)
    );
  }
}
