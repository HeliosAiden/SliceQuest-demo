## startGameLoop
The **startGameLoop** method inside **Overworld** class will do the redering process inside the main canvas for every frame client-side server rendering request.

## Spritesheet animation
In this simple demo, we will use a 4x4 spritesheet with 4 frame foreach directions so the total frames will be 16. We will iterate through all of those frames based on which direction the character is currently heading to and it's state

![Example](/images/characters/people/hero.png "Example hero.png")

## Direction
Default direction will be:

-   top: [0,1]
-   down: [0,-1]
-   left: [-1,0]
-   right: [1,0]

Will update diagonal directions in future updates:

-   upper-left: [-1,1]
-   upper-right: [1,1]
-   bottom-left: [-1,-1]
-   bottom-right: [1,-1]

## User direction input
We will listen to user's arrow key inputs or default AWSD keys to determine which direction to move our character. Then use the [GridSystem](GridSystem.md) to move.

## Camera movement
In traditional 8-bit game, the camera will always hover on top of our playable character. That mean our character is always the center of our screen and the environment move backward accordingly to the character's direction.

So the common formula is: newObjectPosition[x,y] = oldObjectPosition[x,y] - playerMove[x,y]

## Layer
updating...