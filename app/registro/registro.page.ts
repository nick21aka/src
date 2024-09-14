import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AnimationController } from '@ionic/angular';


interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  username: string = '';
  password: string = '';

  

  constructor(
    
    private router: Router,
    private storage: Storage,
    private animationCtrl: AnimationController

  ) {}

  async ngOnInit() {
    
    await this.storage.create();
    console.log('Storage inicializado'); 
  }


  onRegister() {
    this.register();
  }

 
  async register() {
    
    this.username = this.username.trim();
    this.password = this.password.trim();

   
    if (this.username.length < 5 || this.username.length > 10) {
      alert('El nombre de usuario debe tener entre 5 y 10 caracteres.');
      return;
    }

    if (this.password.length !== 4 || !/^\d+$/.test(this.password)) {
      alert('La contraseña debe tener exactamente 4 dígitos numéricos.');
      return;
    }

    console.log('Nombre de Usuario:', this.username);
    console.log('Contraseña:', this.password);

    
    const storedUsers: User[] = await this.storage.get('users') || [];
    console.log('Usuarios almacenados antes de agregar:', storedUsers);
    

    const userExists = storedUsers.find((user: User) => user.username === this.username);

    if (userExists) {
      alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
    } else {
      
      const newUser: User = { username: this.username, password: this.password };
      storedUsers.push(newUser);
      
     
      await this.storage.set('users', storedUsers);
      console.log('Usuarios almacenados después de agregar:', storedUsers); 
      
      alert(`Cuenta creada exitosamente para ${this.username}.`);
      this.router.navigate(['/login']); 
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

   

  }



