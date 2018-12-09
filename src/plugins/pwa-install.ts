import { PluginObject } from "vue";
import { Vue, Component } from "vue-property-decorator";

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt
 * handler before a user is prompted to "install" a web site to a home screen
 * on mobile.
 *
 * @see   https://stackoverflow.com/a/51847335
 * @see   https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 */
export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the
   * event was dispatched. This is provided for user agents that want to present
   * a choice of versions to the user such as, for example, "web" or "play"
   * which would allow the user to chose between a web version or an Android
   * version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted"
   * or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own
   * choosing. This method returns a Promise.
   */
  prompt(): Promise<void>;
}

export interface PluginOptions {
  // Whenever VueInstallMixin should be registered
  mixin: boolean;
}

/**
 * Type guard which checks if a given Event is BeforeInstallPromptEvent.
 *
 * @param   {Event}     event
 * @return  {boolean}   If event is of type BeforeInstallPromptEvent
 */
function isBeforeInstallPromptEvent(
  event: Event
): event is BeforeInstallPromptEvent {
  return "prompt" in event;
}

@Component
export class VueInstallMixin extends Vue {
  installHandler = (event: Event) => {
    if (isBeforeInstallPromptEvent(event)) {
      this.$emit("canInstall", event);
    }
  };

  mounted() {
    // Check in case we are server-side rendering:
    if (typeof window !== undefined) {
      window.addEventListener("beforeinstallprompt", this.installHandler);

      // See: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("beforeinstallprompt", this.installHandler);
      });
    }
  }
}

const InstallPlugin: PluginObject<PluginOptions> = {
  install(Vue, options = { mixin: true }) {
    if (options.mixin) {
      Vue.mixin(VueInstallMixin);
    }
  }
};

export default InstallPlugin;
