import './prepares';

// langs and app settings with env
import '../model/appSettings';

// init general App
import stepSecond from './stepSecond';

// start routers and define renders

function stepFirst() {
    stepSecond();
}

export default stepFirst;
