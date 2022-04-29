import Swal from "sweetalert2";


export function successModal(theme: any, message: string) {

  Swal.fire({
    icon: "success",
    html: `<h1 style = 'color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#111111'}'>${message}</h1>`,
    timer: 2000,
    background: `${theme.palette.mode === 'dark' ? '#111111' : '#ffffff'}`,
    timerProgressBar: true,
    showConfirmButton: false,
    position: 'center',
  });
}

