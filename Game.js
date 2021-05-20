class Game {
          constructor(){
        
          }
        
          getState(){
            var gameStateRef  = database.ref('gameState');
            gameStateRef.on("value",function(data){
               gameState = data.val();
            })
        
          }
        
          update(state){
            database.ref('/').update({
              gameState: state
            });
          }
        
          async start(){
            if(gameState === 0){
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
              }
              form = new Form()
              form.display();
            }
        
            p1 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p2 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p3 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p4 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p5 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p6 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p7 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p8 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p9 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            p10 = createSprite(Math.round(random(displayWidth - (displayWidth + 100), displayWidth + (displayWidth-100))), Math.round(random(displayHeight - (displayHeight + 100), displayHeight + (displayHeight - 100))), 20, 20);
            killers = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

          }
        
          play(){
            form.hide();
        
            Player.getPlayerInfo();

            if(allPlayers !== undefined){
              imageMode(CENTER);
              image(mapIMG, displayWidth/2, displayHeight/2, 1600, 1600);
        
              //index of the array
              var index =0;
        
              //x and y position of the cars
              var x =200;
              var y;
        
              for(var plr in allPlayers){
                index = index + 1 ;
                x = 200 + (index * 200) + allPlayers[plr].xPos;
                y = displayHeight - allPlayers[plr].distance ;
                killers[index-1].x = x;
                killers[index-1].y = y;
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, killers[index - 1].x, killers[index - 1].y + 75);
                if (index === player.index){
                  killers[index - 1].shapeColor = "red";
                  camera.position.x = killers[index-1].x;
                  camera.position.y = killers[index-1].y
                }
               
              }
        
            }
        console.log(displayHeight)
            if(gameState === 1){
              if(keyIsDown(37) && player.index !== null){
                  yVel += 0.9;
            }
          }
          if(keyIsDown(37)){
              xVel -= 0.2;
          }
          if(keyIsDown(39)){
              xVel += 0.2;
          }
  
        
          //move the car
          player.distance += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.985;
          player.update();
          //display sprites
          drawSprites();
        }
           
      
        displayRanks(){
          //display the medals
          camera.position.y = 0;
          camera.position.x = 0;
  
          imageMode(CENTER);
  
          Player.getPlayerInfo();
  
          image(blueIMG, displayWidth/-4, -100 + displayHeight/9, 200, 240);
          image(greenIMG, displayWidth/4, -100 + displayHeight/10, 225, 270);
          image(yellowIMG, 0, -100, 250, 300);
  
          textAlign(CENTER);
          textSize(50);
          for(var plr in allPlayers){
              if(allPlayers[plr].place === 1){
                  text("1st: " + allPlayers[plr].name, 0, 85);
              }else if(allPlayers[plr].place === 2){
                  text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
              }else if(allPlayers[plr].place === 3){
                  text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
              }else{
                  textSize(30);
                  text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
              }
          }
      }
  }
