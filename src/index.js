import screenController from './controllers/screen-controller';
import appController from './controllers/app-controller';
import './styles/global.css';

const screen = screenController();
const app = appController(screen);

app.init();
