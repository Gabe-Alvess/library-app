import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/Book';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  books: Book[] = [];
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.books = [
      {
        img: 'https://rb.gy/bgmnr',
        title: 'Harry Potter #1',
        author: 'J.K Rolling',
        description:
          'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
        genres: 'Science Fiction Fantasy, Young Adult, Adventure, Classics',
      },
      {
        img: 'https://rb.gy/bgmnr',
        title: 'Harry Potter #1',
        author: 'J.K Rolling',
        description:
          'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
        genres: 'Science Fiction Fantasy, Young Adult, Adventure, Classics',
      },
      {
        img: 'https://rb.gy/bgmnr',
        title: 'Harry Potter #1',
        author: 'J.K Rolling',
        description:
          'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
        genres: 'Science Fiction Fantasy, Young Adult, Adventure, Classics',
      },
      {
        img: 'https://rb.gy/bgmnr',
        title: 'Harry Potter #1',
        author: 'J.K Rolling',
        description:
          'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
        genres: 'Science Fiction Fantasy, Young Adult, Adventure, Classics',
      },
      {
        img: 'https://rb.gy/bgmnr',
        title: 'Harry Potter #1',
        author: 'J.K Rolling',
        description:
          'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
        genres: 'Science Fiction Fantasy, Young Adult, Adventure, Classics',
      },
      {
        img: 'https://rb.gy/bgmnr',
        title: 'Harry Potter #1',
        author: 'J.K Rolling',
        description:
          'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
        genres: 'Science Fiction Fantasy, Young Adult, Adventure, Classics',
      },
      {
        img: 'https://rb.gy/bgmnr',
        title: 'Harry Potter #1',
        author: 'J.K Rolling',
        description:
          'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
        genres: 'Science Fiction Fantasy, Young Adult, Adventure, Classics',
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
