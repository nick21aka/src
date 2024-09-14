import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; 
import { AnimationController } from '@ionic/angular';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  validUsers: User[] = []; 

  constructor(
    private router: Router,
    private storage: Storage,
    private animationCtrl: AnimationController
  ) {}

  async ngOnInit() {
    
    await this.storage.create();
    console.log('Storage inicializado.');

    
    this.validUsers = await this.storage.get('users') || []; 
    console.log('Usuarios válidos cargados:', this.validUsers); 

    
    if (this.validUsers.length === 0) {
      this.validUsers = [
        { username: 'Nicolas', password: '1234' }, 
        { username: 'Maximiliano', password: '1234' }, 
      ];
      await this.storage.set('users', this.validUsers); 
      console.log('Usuarios predeterminados agregados:', this.validUsers);
    }
  }

  
  onSubmit() {
    console.log('Formulario enviado.'); 
    this.login();
  }


  crearCuentaNueva() {
    console.log('Navegando a crear una cuenta nueva.');
    this.router.navigate(['/registro']); 
  }


  async login() {
    
    this.username = this.username.trim();
    this.password = this.password.trim();

    console.log('Username:', this.username);
    console.log('Password:', this.password);

    let foundUser = false;


    this.validUsers = await this.storage.get('users') || []; 


    for (const user of this.validUsers) {
      console.log(`Comparando: ${user.username} con ${this.username} y ${user.password} con ${this.password}`);
      if (user.username === this.username && user.password === this.password) {
        foundUser = true;
        console.log(`Usuario encontrado: ${user.username}`);
        break; 
      }
    }

    if (foundUser) {
      await this.storage.set('username', this.username);
      console.log('Almacenando nombre de usuario en el storage:', this.username);
      this.router.navigate(['/home']);
      console.log('Inicio de sesión exitoso.');
    } else {
      alert('Usuario o contraseña inválidos');
      console.log('Error en inicio de sesión.'); 
    }
  }


  



  //Metodo para animar un boton
  animarBoton(){
    //selector de un elemento en el html
    const boton = document.querySelector('.boton-animado');
    
    if(boton){
      const animacion = this.animationCtrl.create()
      .addElement(boton)//agregamos la variable que almacena el selector
      .duration(500)//cuanto dura mi animacion
      .fromTo('transform','scale(1)','scale(1.2)')
      .fromTo('background-color','#000000','red')
      animacion.play();//se ejecuta la animacion
    }else{
      console.error("No existe la clase .boton-animado");
    }
}
}
