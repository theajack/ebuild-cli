import {useParams} from 'react-router-dom';


export default function Topic () {
    const {topicId} = useParams<{topicId: string}>();
    return <h3>Requested topic ID: {topicId}</h3>;
}