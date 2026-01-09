$(document).ready(function () {

  // ===== LOCAL STORAGE =====
  let saldo = localStorage.getItem("saldo")
    ? parseInt(localStorage.getItem("saldo"))
    : 100000;

  let transacciones = localStorage.getItem("transacciones")
    ? JSON.parse(localStorage.getItem("transacciones"))
    : ["Depósito inicial: $100000"];

  function guardarDatos() {
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("transacciones", JSON.stringify(transacciones));
  }

  function actualizarSaldo() {
    $("#saldo, #saldoEnvio").text(saldo);
  }

  function actualizarTransacciones() {
    $("#listaTransacciones").empty();
    transacciones.forEach(t => {
      $("#listaTransacciones").append(
        `<li class="list-group-item">${t}</li>`
      );
    });
  }

  // ===== LOGIN =====
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    let email = $("daniela@alkewallet.cl").val();
    let password = $("1234").val();

    if (email === "daniela@alkewallet.cl" && password === "1234") {
      window.location.href = "menu.html";
    } else {
      alert("Credenciales incorrectas");
    }
  });

  // ===== DEPOSITO =====
  $("#depositForm").submit(function (e) {
    e.preventDefault();

    let monto = parseInt($("#depositAmount").val());

    if (monto > 0) {
      saldo += monto;
      transacciones.push(`Depósito: $${monto}`);
      guardarDatos();
      actualizarSaldo();

      // Animación
      $(".card").hide().fadeIn(600);
      alert("Depósito realizado");
    }
  });

  // ===== ENVÍO DE DINERO =====
  $("#sendForm").submit(function (e) {
    e.preventDefault();

    let contacto = $("#contacto").val();
    let monto = parseInt($("#montoEnvio").val());

    if (monto > 0 && monto <= saldo) {
      saldo -= monto;
      transacciones.push(`Envío a ${contacto}: $${monto}`);
      guardarDatos();
      actualizarSaldo();

      // Animación
      $(".card").effect
        ? $(".card").fadeOut(200).fadeIn(400)
        : $(".card").hide().fadeIn(400);

      alert("Envío realizado");
    } else {
      alert("Saldo insuficiente");
    }
  });

  // ===== EFECTOS DE CARGA =====
  $(".card").hide().fadeIn(800);
  $("h3").hide().slideDown(600);

  actualizarSaldo();
  actualizarTransacciones();
});
