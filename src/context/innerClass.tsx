import {ReactElement} from "react";
import {createRoot, Root} from "react-dom/client";
import "./index.css"

type Props = {

    target?: HTMLElement,
    body?: ReactElement
}

export class InnerClass {
    private readonly innerRoot: Root
    private props: Props;
    private readonly div: HTMLDivElement;


    constructor(props: Readonly<Props>) {
        this.click = this.click.bind(this)
        this.props = props
        this.div = document.createElement("div");
        this.div.className = "bsr-context-menu"
        this.innerRoot = createRoot(this.div);
        document.body.appendChild(this.div)
        this.ContextMenuDidMount()
        this.div.onclick=()=>{
            this.click()
        }


    }

    click() {
        this.innerRoot.render(null)
    }

    contextAction = (e: MouseEvent) => {
        e.preventDefault();
        this.innerRoot!.render(this.props.body)
        setTimeout(() => {

            const bodyH = document.documentElement.scrollHeight;
            const bodyB = this.div.offsetHeight
            alert(bodyH-e.clientY)
            if((bodyH-e.clientY)<bodyB){
                this.div.style.top = (e.clientY - bodyB) + "px"
                this.div.style.left = e.clientX + "px"
            }else{
                this.div.style.top = e.clientY + "px"
                this.div.style.left = e.clientX + "px"
            }
        })

    }

    private ContextMenuDidMount() {
        window.addEventListener("click", this.click)
        this.props.target?.addEventListener("contextmenu", this.contextAction)

    }

    public ContextMenuWillUnmount() {
        window.removeEventListener("click", this.click)
        this.props.target?.removeEventListener("contextmenu", this.contextAction)
        this.innerRoot.unmount();
        document.body.removeChild<HTMLDivElement>(this.div)

    }
}