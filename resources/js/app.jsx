import './bootstrap';

import {createRoot} from "react-dom/client";

const element = document.getElementById('app')
const root = createRoot(element);

function App(){
    return 'Hello Pagos'
}

root.render(<App/>)
