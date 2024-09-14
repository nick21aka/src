import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AnimationController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nombre: string = '';
  username: string = ''; 

  constructor(
    private router: Router,
    private storage: Storage,
    private animationCtrl: AnimationController
  ) {}

  async ngOnInit() {
    await this.storage.create(); 
    this.username = await this.storage.get('username') || 'Usuario'; 
  }

  //Metodo para animar una tarjeta o card
  animarTarjeta(){
    const tarjeta = document.querySelector('.ion-padding');
    if(tarjeta){
      const animacion = this.animationCtrl.create()
      .addElement(tarjeta)
      .duration(1000)
      .fromTo('transform','translateX(-100%)','translateX(0%)')//va a deslizar la tarjeta oculta para que sea visible
      .fromTo('opacity','0','1')
      
      animacion.play();
    }else{
      console.error("No existe la clase .tarjeta-animada");
    }

  }
}
