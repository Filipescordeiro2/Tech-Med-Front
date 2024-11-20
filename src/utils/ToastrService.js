import toastr from 'toastr'; // Importando toastr
import 'toastr/build/toastr.min.css'; // Importando o CSS do toastr

class ToastrService {
  constructor() {
    this.configureToastr();
  }

  configureToastr() {
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
  }

  success(message) {
    toastr.success(message);
  }

  error(message) {
    toastr.error(message);
  }

  warning(message) {
    toastr.warning(message);
  }

  info(message) {
    toastr.info(message);
  }
}

export default new ToastrService(); // Exportando uma instância da classe