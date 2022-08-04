export abstract class Browser {
    protected onCloseFunction : Function = () => {};

    abstract showWindow(url : string, callbackUrl?: string) : Promise<string | undefined>;
    abstract closeWindow(): Promise<void>;

    browserCloseListener(closeBrowserEvent : Function){
        this.onCloseFunction = closeBrowserEvent;
    }
}

export class DefaultBrowser extends Browser {
    public showWindow(url: string) : Promise<string | undefined> {
        const openWindow = window.open(url, "_self")
        if (openWindow) {
            openWindow.addEventListener('beforeupload', () => this.onCloseFunction());
        }

        return;
    }

    public closeWindow(): Promise<void> {
        // Invoking window.close() is not desired. It will either be ignored (most of the time),
        // or it will close the current browser tab if this site was opened via a "_blank" target.
        return;
    }
}
