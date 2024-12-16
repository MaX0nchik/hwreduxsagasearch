import { useDispatch, useSelector } from "react-redux";
import { changeSearchField } from "../slices/skills";

export default function Skills(){
    const {items, loading, error, search} = useSelector(state=>state.skills);
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const {value} = event.target;
        dispatch(changeSearchField({search:value}));
    };

    const hasQuery = search.trim() !== '';
    return(
        <>
        <div>
            <input type="search" value={search} onChange={handleSearch}/>
        </div>
        {!hasQuery && <div>Type something to search</div>}
        {hasQuery && loading && <div> searching ... </div>}
        {error ? <div>Error occured</div>:
            <ul>
                {items.map((item)=> (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        }
        </>
    )
}