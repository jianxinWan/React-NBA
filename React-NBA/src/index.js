import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import router from './router';

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
