import { Vue, Component } from "vue-property-decorator";

@Component
export class InstallPrompt extends Vue {
  deferredPrompt?: Event;

  get canShowInstallPrompt() {
    return Boolean(this.deferredPrompt);
  }

  onCanShowPrompt = (event: Event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt:
    event.preventDefault();
    event.stopPropagation();

    this.deferredPrompt = event;
  };

  created() {
    window.addEventListener("beforeinstallprompt", this.onCanShowPrompt);
  }

  beforeDestroy() {
    window.removeEventListener("beforeinstallprompt", this.onCanShowPrompt);
  }
}
