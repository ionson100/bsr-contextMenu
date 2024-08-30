import { ReactElement } from 'react';

declare function useContextMenu(target: string | HTMLElement | null, body: ReactElement): null;

type PropsClass = {
    target?: HTMLElement;
    body?: ReactElement;
};
declare class ContextMenu {
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

export { ContextMenu, useContextMenu };
