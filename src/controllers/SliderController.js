import Controller from './Controller';
import Slider from '../models/SliderModel';
import SliderService from '../services/SliderService';

const sliderService = new SliderService(new Slider().getInstance());

class SliderController extends Controller {
  constructor(service) {
    super(service);
  }
}
export default new SliderController(sliderService);
