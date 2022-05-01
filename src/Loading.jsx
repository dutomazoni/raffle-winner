import { Loader } from "semantic-ui-react"
import "./loading.scss";

const Loading = () => {
    return (
        <div className={"overlay"}>
            <div className={"center"}>
                <Loader active inline='centered' size='massive'/>
            </div>
        </div>
    )
}

export default Loading
