import { ReactElement } from "react";
type PropsClass = {
    target?: HTMLElement;
    body?: ReactElement;
};
export declare class ContextMenu {
    private readonly innerRoot;
    private props;
    private readonly div;
    private id;
    constructor(props: Readonly<PropsClass>);
    private click;
    private getHeight;
    private getWidth;
    private contextAction;
    private ContextMenuDidMount;
    ContextMenuWillUnmount(): void;
}
export {};
