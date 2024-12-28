@imperez/simple-sound

Simple Sound is an ES6 javascript library to play audio files from the browser. For any examples you can see the html files in the examples directory.

## Intall

```bash
npm i @perez-rich/sound
```

## Usage

```javascript
import { load } from '@perez-rich/sound';

const sound = await load('path/to/sound.mp3');
sound.play();
```
