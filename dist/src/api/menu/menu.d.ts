export namespace MENU_PLACEMENT {
    const TOP: string;
    const TOP_LEFT: string;
    const TOP_RIGHT: string;
    const BOTTOM: string;
    const BOTTOM_LEFT: string;
    const BOTTOM_RIGHT: string;
    const LEFT: string;
    const RIGHT: string;
}
export default Menu;
declare class Menu {
    constructor(options: any);
    options: any;
    dismiss(): void;
    show(): void;
    showMenu(): void;
    showSuperMenu(): void;
    component: import("vue/types/vue").CombinedVueInstance<Vue, object, object, object, Record<never, any>> | undefined;
    /**
     * @private
     */
    private _calculatePopupPosition;
    /**
     * @private
     */
    private _getMenuPositionBasedOnPlacement;
    /**
     * @private
     */
    private _preventMenuOverflow;
}
import Vue from "vue";
//# sourceMappingURL=menu.d.ts.map