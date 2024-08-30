import {ReactElement} from "react";
import {createRoot, Root} from "react-dom/client";


type PropsClass = {

    target?: HTMLElement,
    body?: ReactElement
}

export class InnerClass {
    private readonly innerRoot: Root
    private props: PropsClass;
    private readonly div: HTMLDivElement;


    constructor(props: Readonly<PropsClass>) {
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
    getHeight(){
        var body = document.body,
            html = document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        return height
    }
    getWidth(){
        var body = document.body,
            html = document.documentElement;

        var width = Math.max( body.scrollWidth, body.offsetWidth,
            html.clientWidth, html.scrollWidth, html.offsetWidth );
        return width
    }

    contextAction = (e: MouseEvent) => {
        e.preventDefault();
        this.div.style.visibility="hidden"
        this.innerRoot!.render(this.props.body)
        setTimeout(() => {


            const bodyH = this.getHeight()
            const bodyW = this.getWidth()
            const bodyB = this.div.offsetHeight
            const bodyBW = this.div.offsetWidth
            let YY=e.pageY
            let WW=e.pageX
            //alert(YY+" "+WW)

            if((bodyH-YY)<bodyB+50){
                this.div.style.top = (YY - bodyB) + "px"
                if(bodyW-WW<bodyBW+50){
                    this.div.style.left = (WW-bodyBW) + "px"
                }else{
                    this.div.style.left = WW + "px"
                }

            }else{
                this.div.style.top = YY + "px"
                if(bodyW-WW<bodyBW+50){
                    this.div.style.left = (WW-bodyBW) + "px"
                }else{
                    this.div.style.left = WW + "px"
                }
            }
            this.div.style.visibility="visible"
        },50)

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