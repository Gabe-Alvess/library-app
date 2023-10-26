import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  devs = [
    {
      profileImg: '../../../assets/images/bogdan-profile-photo.jpg',
      name: 'Bogdan Tataru',
      linkedIn: 'https://www.linkedin.com/in/bogdan-tataru-741868269/',
      github: 'https://github.com/TataruBogdan',
      email: 'tatarubog@gmail.com',
    },
    {
      profileImg: '../../../assets/images/anas-profile-photo.jpg',
      name: 'Anas Assaf',
      linkedIn: 'https://www.linkedin.com/in/anas-assaf-/',
      github: 'https://github.com/Anasassaf19',
      email: 'anf9383@gmail.com',
    },
    {
      profileImg: '../../../assets/images/gabriel-profile-photo.png',
      name: 'Gabriel Alves',
      linkedIn: 'https://www.linkedin.com/in/gabriel-webdev/',
      github: 'https://github.com/Gabe-Alvess',
      email: 'gabriel.webdev@hotmail.com',
    },
  ];

  teachers = [
    {
      profileImg: '../../../assets/images/manuel-profile-photo.jpg',
      name: 'Manuel Cogneau',
      linkedIn: 'https://www.linkedin.com/in/cogneaumanuel/',
      github: 'https://github.com/intec-cmanuel',
      email: 'manuel.cogneau@intecbrussel.be',
    },
    {
      profileImg: '../../../assets/images/joey-profile-photo.png',
      name: 'Joey de Kort',
      linkedIn: 'https://www.linkedin.com/in/joeydekort/',
      github: 'https://github.com/JoeydeKort',
      email: 'joey.dekort@intecbrussel.be',
    },
    {
      profileImg: '../../../assets/images/quinten-profile-photo.jpg',
      name: 'Quinten De Clerck',
      linkedIn: 'https://www.linkedin.com/in/quinten-de-clerck/',
      github: 'https://github.com/quintendc',
      email: 'quinten.declerck@intecbrussel.be',
    },
  ];
}
