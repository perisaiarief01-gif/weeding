export const weddingData = {
  names: { bride: 'Rani', groom: 'Arief' }, date: '2026-10-20T09:00:00+07:00', dateLabel: '20 Oktober 2026', fullDate: 'Selasa, 20 Oktober 2026', city: 'Pemalang', venue: 'Rumah Mempelai Wanita',
  mapUrl: '4F96+XCR, Gg. Jambu, Dusun I, Bulu, Kec. Petarukan, Kabupaten Pemalang, Jawa Tengah 52362', guestDefault: 'Nama Tamu', quote: 'Dua jiwa, satu perjalanan, menuju selamanya.',
  images: {cover:'/images/cover.jpg',intimate:'/images/intimate.jpg',closing:'/images/closing.jpg'}, music:'/audio/wedding.mp3',
  navigation: [{id:'home',label:'Home'},{id:'mempelai',label:'Mempelai'},{id:'acara',label:'Acara'},{id:'story',label:'Story'},{id:'galeri',label:'Galeri'},{id:'rsvp',label:'RSVP'},{id:'gift',label:'Gift'}],
  verse: {title:'Doa Terbaik',arabic:'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا',translation:'Dan di antara tanda-tanda (kebesaran)-Nya adalah Dia menciptakan pasangan-pasangan untukmu agar kamu merasa tenteram kepadanya.',source:'QS. Ar-Rum : 21'},
  profiles:[
    {name:'Rani',relation:'Putri pertama dari',parents:'Bapak Sarifudin& Ibu Suweni',instagram:'raniii',photo:'/images/bride.jpg',alt:'Rani mengenakan kebaya hitam dengan kipas'},
    {name:'Arief Rachman Hakim',relation:'Putra kedua dari',parents:'Bapak Endin & Ibu Yanih',instagram:'ifmankim',photo:'/images/groom.jpg',alt:'Arief mengenakan beskap hitam modern'}
  ],
  events:[{title:'Akad Nikah',time:'Pukul 09.00 WIB'},{title:'Resepsi',time:'Pukul 10.00 – 14.00 WIB'}],
  stories:[{year:'2021',title:'Awal Bertemu',text:'Pertemuan yang tidak disangka, namun punya makna.',photo:'/images/casual.jpg'},{year:'2022',title:'Mulai Dekat',text:'Rasa yang tumbuh, perlahan menjadi percaya.',photo:'/images/intimate.jpg'},{year:'2025',title:'Lamaran',text:'Langkah lebih serius dengan restu keluarga.',photo:'/images/engagement.jpg'},{year:'2026',title:'Menikah',text:'Kini, kami memilih untuk terus berjalan bersama selamanya.',photo:'/images/cover.jpg'}],
  storySignature:'Different Chapter, Same Love.',
  gallery:[{id:'studio',src:'/images/cover.jpg',alt:'Rani dan Arief, busana Jawa hitam di antara tirai dan mutiara',position:'center 35%'},{id:'together',src:'/images/intimate.jpg',alt:'Bersandar bersama dalam potret yang intim',position:'center 35%'},{id:'bride',src:'/images/bride.jpg',alt:'Potret Rani dengan kipas hitam',position:'center 30%'},{id:'groom',src:'/images/groom.jpg',alt:'Potret Arief dalam beskap hitam',position:'center 30%'},{id:'gateway',src:'/images/closing.jpg',alt:'Berjalan bersama menuju gerbang candi',position:'center 50%'},{id:'casual',src:'/images/casual.jpg',alt:'Momen santai Rani dan Arief',position:'center 35%'},{id:'engaged',src:'/images/engagement.jpg',alt:'Potret lamaran Rani dan Arief',position:'center 35%'}],
  rsvp:{title:'Konfirmasi Kehadiran',description:'Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',success:'Terima kasih. Konfirmasi kehadiran Anda telah tersimpan.',privacy:'Jika Anda menulis pesan, nama, kehadiran, dan ucapan Anda akan tampil di buku tamu.'},
  gift:{title:'Wedding Gift',description:'Kehadiran dan doa Bapak/Ibu/Saudara/i merupakan hadiah terindah bagi kami. Namun, apabila berkenan memberikan tanda kasih, dapat melalui:',accounts:[{bank:'BCA',number:'123456789012',display:'1234 5678 9012',holder:'Arief Rachman Hakim'},{bank:'mandiri',number:'987654321098',display:'9876 5432 1098',holder:'Rani'}],address:'Jl. Melati No. 10, Taman Sari, Pemalang 55133'},
  closing:{title:'Terima Kasih',text:'Atas doa, restu, dan kasih sayang yang telah diberikan. Sampai jumpa di hari bahagia kami.',signature:'Rani & Arief'}
};
export type Wish={id:string;name:string;attendance:'hadir'|'tidak';message:string;created_at:number};
export type RSVPInput={id:string;name:string;attendance:'hadir'|'tidak';guests:number;message:string;website?:string};
