let dosCartes=[0,0,1,1,2,2,3,3,4,4,5,5,6,6]; //paires
let statutCartes=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];  //cartes de dos
let retournees=[];   //tableau numéros de cartes retournées
let trouvees=0; //paires trouvées
let time=120;
let fin=0;

let images=document.getElementById('tapis').getElementsByTagName('img');
for (let i=0;i<images.length;i++){
  images[i].num=i;
  images[i].onclick=function(){
    programme(this.num);
  }
}

init();

function mixAfficher(num){
  switch(statutCartes[num]){
    case 0:   //si la carte est de dos
      images[num].src="images/dos.png";
        break;
    case 1:   //si la carte est retournée
      images[num].src="images/carte"+dosCartes[num]+".jpg";
      
        break;
  }
}

function init(){
  for(let place=dosCartes.length-1;place>=1;place--){
    let sort=Math.floor(Math.random()*(place+1));
    let save=dosCartes[place];
    dosCartes[place]=dosCartes[sort];
    dosCartes[sort]=save;
  }
}
function timer(){
  document.querySelector('.chrono').innerHTML=time+' sec left';
    if(time>0){
      setTimeout(timer, 1000);
      time--;
    }
    else{
      time=fin;
    }
    document.querySelector('.chrono').innerHTML=time+' sec left';
    if(time<11){
      document.querySelector('.chrono').style.color="red";
    }
    if(time===0){
      if(!alert("END OF GAME! REPLAY?")){
        window.location.reload();
      };
    }
  }

  timer();

function programme(num){
  if(retournees.length<2){   //pour avoir max 2 cartes retournées
    if(statutCartes[num]==0){
      statutCartes[num]=1;
      retournees.push(num);
      mixAfficher(num);
    }
    
    if(retournees.length==2){
      let newstatut=0;
      if(dosCartes[retournees[0]]==dosCartes[retournees[1]]){
        document.querySelector('.message').innerHTML="BRAVO!"
        console.log(dosCartes[retournees[0]]);
        console.log(dosCartes[retournees[1]]);
          newstatut=1;
          trouvees++;
          time=120;
      }
      else{
        document.querySelector('.message').innerHTML="TRY AGAIN!"
          statutCartes[retournees[0]]=newstatut;
          statutCartes[retournees[1]]=newstatut;
      }

      setTimeout(function(){
        mixAfficher(retournees[0]);
        mixAfficher(retournees[1]);
        retournees=[];
          if(trouvees==7){
            replay();
          }
      },1000);
    }
  }
}

function replay(){   //recharge le jeu à la fin de la partie
  alert('Bien joué!');
    location.reload();
}

console.log(retournees);