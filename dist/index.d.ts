import React, { ReactElement } from 'react';

declare const useContextMenu: (target: React.RefObject<HTMLElement> | null, body: ReactElement) => void;

type PropsClass = {
    target?: HTMLElement;
    body?: ReactElement;
};
declare class ContextMenu {
    private readonly innerRoot;
    private props;
    private readonly div;
    private readonly id;
    constructor(props: Readonly<PropsClass>);
    private click;
    private getHeight;
    private getWidth;
    private contextAction;
    private ContextMenuDidMount;
    ContextMenuWillUnmount(): void;
}

export { ContextMenu, useContextMenu };
