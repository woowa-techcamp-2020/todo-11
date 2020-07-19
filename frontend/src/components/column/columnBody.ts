import {div, p, span} from '../common/defaultElement';
import Card from '../card/card';

const className = "column-body";

export default class ColumnBody {
    constructor() {
        
    }
    render() {
        return div({className}, 
            (new Card).render(),
            (new Card).render(),
            (new Card).render()
        )
    }
}