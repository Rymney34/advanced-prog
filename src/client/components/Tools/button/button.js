import "./button.css"


export default function Button(props) {

        const {
            link,
            onClick,
            text,
            style,
            wrapStyle,
            // type = 'button',
            target = '_blank' 
        } = props;

        return (
           <button type='button' className="ButtonWrap">
                <span></span>
           </button>

        )
    
}
