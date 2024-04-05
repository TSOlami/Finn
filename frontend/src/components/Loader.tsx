import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


export default function Loader() {
    return (
        <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" color="green" />
        </div>
    );
}
