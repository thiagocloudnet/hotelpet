/* Autor: Thiago Ferreira Prates Neves | Professor: Lucas Santos de Oliveira
   Pessoas e animais fictícios para demonstrar a operação do hotel. */
(() => {
  const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const dateOffset=days=>{const date=new Date(today()+'T12:00:00');date.setDate(date.getDate()+days);return date.toISOString().slice(0,10);};
  const occupied=data=>data.reservas.filter(item=>item.status==='Em andamento'&&item.checkin<=today()&&item.checkout>today());
  const dogBreeds=['Labrador','Poodle','Beagle','Golden Retriever','Pastor Alemão','Shih Tzu','Bulldog Francês','Yorkshire Terrier','Dachshund','Border Collie','Maltês','Akita','Boxer','Chihuahua','Dálmata','Rottweiler','Schnauzer','Spitz Alemão'];
  const catBreeds=['Siamês','Persa','Maine Coon','Ragdoll','Bengal','Abissínio','Azul Russo','Balinês','Angorá Turco'];
  const dogNames=['Marley','Belinha','Aurora','Beethoven','Kiara','Snoopy','Lassie','Milo','Maggie','Pluto','Amora','Odin','Jade','Scooby','Frida','Zeus','Bento','Paçoca'];
  const catNames=['Pandora','Frajola','Chanel','Mingau','Salem','Marie','Nino','Pérola','Lua'];
  const owners=['Ana Clara Almeida','Bruno Henrique Santos','Carolina Mendes Rocha','Daniel Ribeiro Lima','Elisa Martins Costa','Felipe Andrade Souza','Gabriela Nunes Silva','Henrique Oliveira Reis','Isabela Ferreira Dias'];
  const reservationCode=value=>String(Number.parseInt(value,10)||1).padStart(4,'0')+'hsp';
  function nextReservation(data){const highest=Math.max(0,...data.reservas.map(item=>Number.parseInt(item.number,10)||Number.parseInt(item.code,10)||0));const next=Math.max(highest+1,Number(data.nextReservationNumber)||1);data.nextReservationNumber=next+1;return next;}
  function migrate(data){
    const oldDogs=['Thor','Mel','Nina','Max','Amora','Bento','Lola','Theo','Pipoca','Ravi','Belinha','Apolo','Jade','Zeca','Frida','Hulk','Chico','Paçoca'],oldCats=['Luna','Félix','Simba','Nala','Tom','Íris','Boris','Olívia','Romeu'];
    data.pets.forEach(pet=>{
      if(pet.nameIsCustom)return;
      if(pet.demo){const index=Number.parseInt(pet.id.split('-').at(-1),10);if(Number.isFinite(index)){const dog=pet.type==='Cachorro',position=dog?index-Math.floor(index/3):Math.floor(index/3);const old=(dog?oldDogs:oldCats)[position%(dog?oldDogs:oldCats).length];const name=(dog?dogNames:catNames)[position%(dog?dogNames:catNames).length];if([old,'Cão '+(index+1),'Gato '+(index+1)].includes(pet.name))pet.name=name;}}
      if(pet.id==='p1'&&pet.name==='Toto')pet.name='Billy';
      if(pet.id==='p2'&&pet.name==='Mia')pet.name='Garfield';
      if(pet.id==='p5'&&pet.name==='Bob')pet.name='Bilu';
    });
    const used=new Set();let high=Math.max(0,...data.reservas.map(item=>Number.parseInt(item.number,10)||Number.parseInt(item.code,10)||0));
    data.reservas.forEach(item=>{let number=Number.parseInt(item.number,10)||Number.parseInt(item.code,10)||0;if(number<1||used.has(number))number=++high;used.add(number);item.number=number;item.code=reservationCode(number);const pet=data.pets.find(pet=>pet.id===item.petId);if(pet){item.pet=pet.name;item.race=pet.race;}});
    data.nextReservationNumber=Math.max(high+1,Number(data.nextReservationNumber)||1);
  }
  function fill(data,capacity=30){
    const target=Math.round(capacity*.9),current=occupied(data).length;
    for(let index=current;index<target;index++){
      const ownerIndex=(index-current)%owners.length;
      const ownerId='demo-cliente-'+ownerIndex;
      let owner=data.users.find(item=>item.id===ownerId);
      if(!owner){owner={id:ownerId,name:owners[ownerIndex],email:'cliente'+(ownerIndex+1)+'@example.com',phone:'',role:'Cliente',status:'Ativo',created:today().split('-').reverse().join('/'),photo:'imagens/avatar-beatriz.svg',demo:true};data.users.push(owner);}
      const dog=(index-current)%3!==2,breedIndex=(index-current)-Math.floor((index-current)/3),race=dog?dogBreeds[breedIndex%dogBreeds.length]:catBreeds[Math.floor((index-current)/3)%catBreeds.length];
      const dogWeights=[30,7,12,28,32,6,11,3,8,19,4,34,27,2,24,42,15,5];
      const weight=dog?dogWeights[breedIndex%dogWeights.length]:[4,4.5,8,6,5,4,4.2,3.8,4.8][Math.floor((index-current)/3)%9];
      const stamp=Date.now()+'-'+index;
      const pet={id:'demo-pet-'+stamp,name:dog?dogNames[breedIndex%dogNames.length]:catNames[Math.floor((index-current)/3)%catNames.length],type:dog?'Cachorro':'Gato',race,weight,size:weight<=10?'Pequeno':weight<=25?'Médio':'Grande',ownerId:owner.id,owner:owner.name,icon:dog?'🐶':'🐱',demo:true};
      data.pets.push(pet);
      data.reservas.push({id:'demo-reserva-'+stamp,number:nextReservation(data),petId:pet.id,pet:pet.name,race,weight,size:pet.size,ownerId:owner.id,owner:owner.name,checkin:dateOffset(-1),checkout:dateOffset(3),status:'Em andamento',note:'Exemplo fictício de hospedagem para apresentação acadêmica.',demo:true});
    }
    migrate(data);return data;
  }
  window.HotelPetDemo={today,occupied,fill,migrate,reservationCode,nextReservation};
})();
