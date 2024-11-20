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

<<<<<<< HEAD
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
=======
  showNotification(type, message) {
    switch (type) {
      case 'success':
        toastr.success(message);
        break;
      case 'error':
        toastr.error(message);
        break;
      case 'warning':
        toastr.warning(message);
        break;
      case 'info':
        toastr.info(message);
        break;
      default:
        console.warn('Tipo de notificação desconhecido:', type);
    }
  }
}

export default new ToastrService(); // Exportando uma instância da classe 
>>>>>>> 3266ea51e60edee22d1b157d47c4c994b2b3c35b
