// https://code.jquery.com/jquery-2.2.4.min.js
// https://cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.1.5/wavesurfer.min.js

var wavesurfer = WaveSurfer.create({
    barWidth: 1,
    container: '#wavesurfer',
    cursorWidth: 0,
    dragSelection: true,
    height: 500,
    hideScrollbar: true,
    interact: true,
    normalize: true,
    waveColor: 'rgba(255,255,255,.05)',
    progressColor: 'rgba(255,255,255,.15)'
});

var audioList = []
for(let i = 001; i <= 144; i++ ){
audioList.push("https://server8.mp3quran.net/frs_a/"+(i).toString().padStart(3, "0")+".mp3");
}
var audioList_i =0;

function _check(){
if(audioList.length > 1 && audioList_i <= audioList.length-1 && audioList_i !=0){
    $(".button__prev").addClass("action");
}else{
   $(".button__prev").hasClass("action")? $(".button__prev").removeClass("action"):null;
}
if(audioList.length > 1 && audioList_i <= audioList.length-2){
    $(".button__next").addClass("action");
}else{
   $(".button__next").hasClass("action")? $(".button__next").removeClass("action"):null;
}
}

$('.player').on('click', '#play', function(){
  if( $(this).hasClass('load') ){
    $(this).removeClass('load');
    wavesurfer.load(audioList[audioList_i]);
    _check();
  } else {
    wavesurfer.playPause();
    _check();
  }
});

$('.player').on('click', '.button__prev.action', function(){
  audioList_i--;
    wavesurfer.load(audioList[audioList_i]);
 if (audioList_i == 0){
   $(".button__prev").hasClass("action")? $(".button__prev").removeClass("action"):null;
 }
    _check();
});

$('.player').on('click', '.button__next.action', function(){
  audioList_i++;
    wavesurfer.load(audioList[audioList_i]);
 if (audioList_i == audioList.length-1){
   $(".button__next").hasClass("action")? $(".button__next").removeClass("action"):null;
 }
    _check();
});

var m,
    s;

function getMinutes( convTime ){
  convTime = Number(convTime);
  m = Math.floor(convTime% 3600 / 60);
  return ((m < 10 ? "0" : "") + m);
}

function getSeconds( convTime ){
  convTime = Number(convTime);
  s = Math.floor(convTime % 3600 % 60);
  return ((s < 10 ? "0" : "") + s);
}

var totalTime,
    timeJump,
    currentTime,
    currentTimeJump;

wavesurfer.on('ready', function(){
  totalTime = wavesurfer.getDuration();
  timeJump = 300 / totalTime;
  $('.wavesurfer__elem').addClass('show');
  $('.button__loader').fadeOut();
  $('.time__minutes').text( getMinutes( totalTime ) );
  $('.time__seconds').text( getSeconds( totalTime ) );
  $('.time, .progress').fadeIn();
  
  wavesurfer.play();
});

function progressJump(){
  currentTime = wavesurfer.getCurrentTime();
  currentTimeJump = currentTime * timeJump + 10;
  $('.progress__button').css({ left: currentTimeJump+'px' });
  $('.progress__indicator').css({ width: currentTimeJump+'px' });
  
  $('.time__minutes').text( getMinutes( currentTime ) );
  $('.time__seconds').text( getSeconds( currentTime ) );
}

wavesurfer.on('audioprocess', function(){
  // progressJump();
});

wavesurfer.on('pause', function(){
  $('.button__play-iconplay').fadeIn();
  $('.button__play-iconpause').fadeOut();
  $('.recordplayer').removeClass('play');
  $('.recordplayer__disc').removeClass('animate');
  $('.artist__image').removeClass('play');
});

wavesurfer.on('play', function(){
  $('.button__play-iconplay').fadeOut();
  $('.button__play-iconpause').fadeIn();
  $('.recordplayer').addClass('play');
  $('.recordplayer__disc').addClass('animate');
  $('.artist__image').addClass('play');
});

wavesurfer.on('loading', function(event){
  $('.button__loader').css({ height: event+'px' });
});

wavesurfer.on('seek', function(event){
  progressJump();
});