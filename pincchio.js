(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"pincchio_atlas_1", frames: [[824,319,82,303],[1549,0,352,560],[1250,319,40,157],[908,319,82,303],[0,319,352,560],[1903,0,107,369],[992,319,127,64],[719,319,103,367],[1121,319,127,64],[354,319,363,528],[2012,0,1,15],[0,0,1547,317]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_21 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(img.CachedBmp_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2590,1635);


(lib.CachedBmp_10 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(img.CachedBmp_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2508,1186);


(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2343,967);


(lib.CachedBmp_23 = function() {
	this.initialize(img.CachedBmp_23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2508,1186);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2343,967);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4276,2106);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4276,2106);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4276,2106);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2943,1840);


(lib.CachedBmp_1 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.clouds3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(56,56,56,0.424)").s().p("AgJgrIAFgBIACAKIAMBOIgKABQgGgsgDgsg");
	this.shape.setTransform(-251.05,18.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(58,59,59,0.373)").s().p("AhOAIICTgXIAKgCIAAAFQhOARhNANIgCgKg");
	this.shape_1.setTransform(-282.2625,49.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(30,38,40,0.224)").s().p("AgZgDIgBgLQAdABAUANQADACABAFQgFAAgEADIgFAFQgPgPgXgDg");
	this.shape_2.setTransform(-178.325,-35.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(187,203,206,0.992)").s().p("AgpAgQAgglAlggQAEgCAFgBIAFgBQgeAugzAlIgCgKg");
	this.shape_3.setTransform(-150.05,-55.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(8,15,17,0.973)").s().p("AjiGXIgMgDQhWgQg5g3QgBgEgCgCQgagVgUgZIgDgTIgCgKIgNhPIgCgKQAjjnCJieQBGhQBog8QAYgOAjgIQApgIAbgKQAhgLAagCQA7gDArALQBAAQA0AfQA0AeA8ATQgHAbAiAVQAUAMgPAAQgRgBgNgMQgsgqg9gSQgBgFgDgCQgUgOgfAAQhPgehzAWQhxAWhDA3QimCMg1DXIgFARQgRA0AXBRQA9A3BSAZQBOAYBsgRQAOgCANgHQAagMABgmQAChBgVhUQgLhBAkA0QAWAgARAoQALAYAFAjQALBNgTA4QgdAWgjASQgkASgzAFQgcACgcAAQg+AAg3gNg");
	this.shape_4.setTransform(-206.4786,-1.9281);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(2,11,13,0.106)").s().p("AATAtQhegIhCguIgCgKIgBgKQgBgjAYAoQAEAFAFAFQBDAuBmgHQATgBAJgMQAKgBAJABIAWACQApADgvARQgmAMgnAAIgYgBg");
	this.shape_5.setTransform(-88.0882,47.286);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(184,202,205,0.945)").s().p("AgIAIIgBgVQgBgdABgaIAFAFQAAAlANAOQAGAGgEAGIgEAFQALAcgUAiIgKACQAHgagDgjg");
	this.shape_6.setTransform(-32.1286,-9.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(132,132,132,0.863)").s().p("AgHgrIAFgBIACAKQAPAxgNAeQgGgsgDgsg");
	this.shape_7.setTransform(-31.9785,51.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(127,127,127,0.898)").s().p("AhOAIICTgXIAKgCIAAAFQhOARhNANIgCgKg");
	this.shape_8.setTransform(-71.5125,109.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(20,30,31,0.357)").s().p("AgHAKQgDgCgFABQAOgkARAQIgBAHQgDAQgPAFQgBgFgDgCg");
	this.shape_9.setTransform(-151.6667,98.4479);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AFE2EC").s().p("ABrLQQglgmg6gLQgOgKgYALIgeAQQgnASghAWIgMAGQhjAphagXQgJgCgGgEIgGgEQgWAGgggPQgxgXgogjIgMgJQhag4hLhOQgmgngqgfQgrgggsgbQhbg5h3gPQAPgUAqgCQAmgCAhAEQBAAHA8APQDYA2EmguIAFgBQAGgOAagEQCLgZBug2IALgEQAjgMAcgSQAYgOAjgLQBmggAzAmQAaAFAOAUIALAPQAUAeANAmQAaBOApAzQBoBQC8gfQBHgLAvgTIAGgDQAtgdAlgnQAThEgfgsIgQgXQgUgdgYgbQgag5AugGQAqgFAVAYQBFAUAZBWIACAKIADAUQAGBAgMAwIg+B6QgDAGgDgBQgVgHAAARQAAARgLALQhMBGiSAWQgUADgTgDQgbgFgkACQgKABgJgDQgzgRhJAPQhjAWgyA7QgiAphPAJQhAgHgogqgAhCASIgSgEQg0gOgvgaQhegzgyhsQgPgggUgWQgKgvANgfQADgJAKgCQBagQA6AiQBdA1BkAsQAwAUBMgQQBEgPAigpIAagZQAEgFABgHQADgvgUgUQgmgngVg+QgJhjApg9QAHgJAHgFQAPgKAJgKQA+hSCQgTIAKgBQApgEAfAGQDfAvBTD3IADAKQAbCRhNBMQgmAvhfAEQhPADhSgBQgeAAgnANQgYAJgjAGIiEBrQhCA2h1AQQggAEgcAAQggAAgegFg");
	this.shape_10.setTransform(-156.1388,22.3988);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(131,197,208,0.996)").s().p("AHQOXQgBgFgCgBQgugRgogWQAAgjAegRQAYgOAMgbQAQgFADgRIABgHQgSgQgOAlQg0AthDAjQhIAkhmAJQg5AGg2gCQg/gDgugZIgNgIQhbg3hJhOIgMgLQgPgOgNgRQhBhchdg1IgLgJQgpgigzgQQhtgiiaAcIgKABIiCANQhDAHg3gNQhvgchegyQiuhcishdQADgkAsATIANAEQByAYBrAhQBrAhB7ANQA7AGBAgFQA4gFAtABQAwADAXgQQALgIAPgBQA2gGAjgNQAZgJAOgJQAMgIANgGQAFgCAFgGQBNgbA3gpIAggZQARgPgQADIgUAFQgQAFAHgbQAEgMATgEQA5A3BWAQIAMACQBPAUBegJQAzgEAlgTQAjgRAdgWQASg4gLhNQgEgigLgZQgRgngWghQgkgzALBAQAVBUgCBBQgBAlgaANQgNAGgPADQhsARhOgYQhSgag9g1QgXhSARgzIAFgSQA1jYCmiLQBDg4BygVQBygWBPAdIACAKQAXAFAPAOIAGgEQAEgDAFAAQA9ARAsArQANALARABQAPABgUgMQgigWAHgaQAbhZA4hGQACgCgBgFQAQgGAFgQQABgCAEgBIACAKQA0glAegwIgFABQBRhJCSgYQBIgMA8AJQB2ARBXA8QCPBiBwCOQAiAsAxAUIAQAGQBEAYA8AlIANAIQAbAQAZAUQATAQAKAWQACADgEAGIgGgEQgBAZACAeIABAVQACAjgGAaIAKgCQAAAFgBAFQggBmhPBFQgFABgEADQg4AlhkAHQgLgIgNgEIgQgGQg0gXgqgmQADATALAJQAGAEADAGQAMASgOgEQgigKgyAHQhgAMg6AkQg0A1gYBIQgDAJgEAHQgRAeAQA3IAKgBIABAJIACAKQBCAvBfAJQA0AFAxgRQAvgQgpgEIgWgCQgJgBgKACQAAgCgBAAQAAgBAAgBQAAAAgBAAQAAgBAAABQhfgHhAgrQgFABgCgCQgvg1Akg2QATgeAegXQALgIAMgGQA4gcBFAEQAnACAjAJQAzALArATQBkArBKBPQAUAaAAAzQAAAlACAsIAAALQAEBcgYBIQgPAwgXAsQgyBghvA1IgMAEQh6AuiVAXQgFABgEgBQhOgeg8g5QgPAEgDgVIAAgFQgdApglAhQg4Awg9AqQgqAcg9AMQgpAHgkAAQgdAAgZgFgAGdKjQA5AKAlAmQApArBAAHQBOgJAjgpQAxg8BjgVQBJgPA0ARQAIADAKgBQAkgCAcAFQASACAUgDQCTgVBLhHQALgLAAgRQABgRAVAIQACAAADgGIA+h5QANgwgHhAIgDgVIgCgKQgYhWhFgUQgWgYgqAGQguAFAaA6QAZAaAUAeIAPAWQAgAsgTBFQgmAmgtAeIgFADQgwAThGALQi8AehphPQgpg0gahOQgNglgUgfIgKgOQgPgUgagGQgzgmhmAgQgiALgYAPQgcARgkAMIgLAFQhuA1iLAZQgbAFgGANIgFABQkkAujYg2Qg9gPhAgGQghgEgmABQgqACgPAUQB3AQBcA4QAsAcArAfQAqAgAmAnQBLBOBaA4IALAIQAoAjAxAXQAgAQAVgHIAGAEQAGAEAJACQBaAXBkgpIALgGQAhgVAngTIAfgPQAMgGAKAAQAKAAAHAFgAA2lEQgKABgEAJQgNAgALAvQAUAVAOAgQAyBsBeAzQAvAZA1AQIARAEQA5AKBCgJQB1gQBDg2ICDhsQAjgFAZgJQAmgOAeAAQBSACBQgEQBegEAnguQBNhMgciSIgDgKQhTj2jfgvQgegHgpAEIgKABQiQAUg/BRQgJALgPAKQgHAEgGAJQgqA9AKBjQAVA+AlAnQAVAUgEAwQAAAGgFAFIgaAZQghAphFAPQhLARgxgVQhlgrhdg2QgngXg2AAQgZAAgdAGg");
	this.shape_11.setTransform(-196.1795,22.0413);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(14,18,19,0.969)").s().p("AJKPMQghgFglAEQgBgEgDgBQhLgkg7g5QgTAEgJAKQgEAGgGADQgNAFgMAIQgdAUgxAKQhkAVhQADQg9ACgwgPQiMgthhhqQhJhRhShGQhFg8hegZQgegHgfgCQhCgDhKAHIiMAOIgLACQguAKgbgHQhUgUhJggQgkgQgigSIiLhLQi5hkiph6QgahDBBADIANABQB7AMBrAhQBrAhBrAeIBfAZIASAEQArAKAzAFIANAAQA5ADA/gJIABAKQBPgNBNgSIAAgFQApgFAcgKQAngOAeAGQgEAGgFACQgOAGgLAIQgOAJgaAJQgjANg1AGQgQABgLAIQgXAQgvgDQgtgBg5AFQg/AFg7gGQh7gNhrghQhrghhzgYIgMgEQgsgTgDAkQCrBdCuBcQBfAyBuAcQA4ANBDgHICBgNIAKgBQCbgcBsAiQAzAQApAiIAMAJQBcA1BCBcQAMARAQAOIALALQBKBOBaA3IANAIQAvAZA+ADQA3ACA5gGQBmgJBHgkQBEgjA0gtQAFgBADACQADACAAAFQgLAbgZAOQgeARABAjQAoAWAtARQADABAAAFQA5ALBLgNQA9gMAqgcQA9gqA3gwQAmghAcgpIABAFQACAVAQgEQA7A5BPAeQADABAFgBQCVgXB6guIAMgEQBwg1AyhgQAWgsAQgwQAXhIgDhcIgBgLQgCgsAAglQAAgzgUgaQhKhPhjgrQgrgTgzgLQgjgJgogCQhEgEg5AcQgLAGgLAIQgfAXgTAeQgkA2AvA1QACACAFgBQBAArBfAHQAAAAABAAQAAAAAAABQAAAAABABQAAABAAABQgJALgTABQhnAHhCgvQgGgEgDgGQgYgnAAAjIgKABQgQg3ARgeQAEgHADgJQAZhIAzg1QA6gkBggMQAygHAiAKQAPAEgMgSQgEgGgFgEQgLgJgEgTQArAmAzAXIARAGQANAEALAIQBjgHA5glQADgDAFgBQBPhFAhhmQABgFgBgFQAVghgLgdIAEgGQAEgFgGgGQgOgOAAgmQAEgGgBgDQgLgWgTgQQgZgUgagQIgOgIQg8glhEgYIgQgGQgxgUgigsQhviOiPhiQhYg8h2gRQg7gJhIAMQiTAYhQBJQgFABgEADQgnAggfAmQgFABgBACQgEAQgRAGIgKABQAUhSBGgvQA4gkA5giQAQgJASgIQA5gWBRgIQCOgPBnAqIAyAXQC9BgCFCvQAGAIAIAGQAJAGAHAJQCtAkB1B2QAUAUARAZQANBKgMA6QgcCHhZBcIgLAMQgXAagtAOIgKADQg1ABgCAgQBDARApA2IAMAOQAUAYAJAeQAMAmAHAnIgFABQACAtAHAsQARB0gWBZQgGAegKAaQg3CaidBNQgIAFgHAFQgWASgwAAIgKACIiUAYQhCATgtgEQg1gFgcggQgpgugwglQgVBqhpAxQgjARgqAMQg0AQgqAAQgOAAgMgCg");
	this.shape_12.setTransform(-198.4084,22.4248);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(19,126,151,0.996)").s().p("AgdFvQgJgCgJgEQjKhbh9ioQhBhXALifIAdg9QAshbBXgwQAlgNAqgJQBTgQBEAmQAzBEgICEIgICLIgBAKQgHAqgbASQAbhDgChmQgChegNhMQgFAAgBgCQgXg2hRAGQiOAcgmCEQgIAbgMAXQgFCaBABWQA5BNBNA5QAyAkA5AdQBOAEA0gUQCzhFCghVQhcBsiLA8QgxAWg0AOQgqAMgnAAQgXAAgYgEg");
	this.shape_13.setTransform(147.9265,97.5143);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(8,12,12,0.129)").s().p("AgdALQAVgJAMgSQABgCAFAAQAFAFAGADQAEACAFAAQAAAFgCABQgIADgFAFQgOANgLAAQgKAAgJgIg");
	this.shape_14.setTransform(270,38.9321);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(71,71,71,0.404)").s().p("AgEAeIAAhFQAQAcgMAyQAAABgEAAIAAgKg");
	this.shape_15.setTransform(289.5191,19);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(89,89,89,0.655)").s().p("AgIA3IAAh3QAQASAAAqQABAvgRAWIAAgKg");
	this.shape_16.setTransform(396.8507,81.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#0D7B95").s().p("ACqAmQgTgugrgdQhSg4iVAPQhBAGg4ATIAAgKQA8gyBZgXQAygNBGAFQCoANAqCJQAWAtgbAnIgKAMQgUAYgZAUQAQg3gVg1g");
	this.shape_17.setTransform(301.4889,96.3682);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(82,82,82,0.525)").s().p("ABGAFIiVAAIAAgJQBPAABQAEIAAAFIgKAAg");
	this.shape_18.setTransform(338,15.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(86,86,86,0.557)").s().p("AAeAFIhFAAIAAgJQAnAAAnAEIABAFIgKAAg");
	this.shape_19.setTransform(174,-5.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(151,210,220,0.996)").s().p("AoELOQg4gRg2gXIgYgKQgggLgGgjQBXg/A7haQAEgHADgJQACgGAFgFQAPgUAKgWQAFgNgHgKQgDgFgFAFIgKALIhBBKQifBWizBEQg0AVhQgFQg4gcgyglQhNg4g6hOQhAhWAFibQANgWAIgcQAmiDCNgcQBRgGAXA1QABACAFAAQAOBNACBdQABBmgbBEQgKAKgGAMQgEAIgFAEQgTAQgkgCQg5gFgQg0IgCgGQgGBqBvgBQBNgXAlg9QAphCALhjIAFgzQATiohGhRQgwg5hcgKQh4gNhGAoQgdAQgLgQQA1hhBBhVQACgDAAgFICthUQAMgGAPAAIAUAAQBCAFApAeIA+AvQAMAIATAAQANgIgXgWQgzgwgEhmIABgJQAMhJAqgwQAZgKAagDQBZgMA0AgQAcASAZAUIgBAGQgFAcgTALQgOAoATAPIAEgGQBXiFCvgsQA9gPAzgUIAjgNQAbgJAjgFQBBgKBKAFQBCAEA2AVQBfAjA5BKQA5BIABCBQgzA7hNAjQgCABAAAFQgFAAgBACQgMAUgWAIQAUAUAZgZQAFgFAIgEQACgBAAgFQBxg0B9grQAqgPA8gEIALgCIAwgIQB8gXCdALQCJAKBOBHIALAKQCaCMA3DrQAPBAgDBLQgBAkgLAaQgWA4geAsQg+BZhWBBQhWA/hvAjIgjANQg0AThHAGQhPAIgzgEIgogBIgKgBQgegEgegBQiMgJiCgTQhCgKg2gVQAAgFgBAAQgggLgbgOQgFAAgBgCQgEgIAAgKQAKgUAGgVQAVhSAng8QAfgtAugbIAOgJQAIgGAFgKQA4gTBBgGQCWgPBSA4QArAdATAvQAVA1gQA3QgpAdg5AQQg/ARgxggQg5gIALhHQABgGgBgCQgIgWgPAeQgLAYAAAjQAaAdAdAaIAMAKQAmAZBBgDQB5gGBPgzQAAgFADgCQApgnAag2QARiDg0g/IgKgMQgZgdgdgaQhOhHiPgGQhNgEg9ATQjdBFhgDEQgyBngYB9Qg8BLhTAyQhZA1iKAEIgTAAQhDAAg0gQg");
	this.shape_20.setTransform(249.8569,66.754);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(11,15,16,0.973)").s().p("AmVMoQh8gdhKhMQgUgUgfgJQgyAjg4AfQg1AdhHAIQijAUhgg2Qi+hph3ivQg+haAAiVQASgXgDgvQAAgFACgGQApiEBmhCIAXhZIAEgMQBKjgDwgxQAdgGAegCQA2gCAXAdQADAFAFgFQAFgFgDgJQgCgGgFgFQgQgsAFhCQADgrAXgWIAKgLIApgwQAVgYArgCIBGAAIAKAAQBhAXA4BAQACADAFAAQB1hnCig8QA2gUA5gQQAhgJAlgCIBGgFQAkgDAiAGQD+AqBVDSQALAcgBAqIAABGIAAAKQgHAqAlgXQA3giBUgKIAMgCIBugeQA1gOBCABICWAAIAKAAQBIADAxAXQDLBfBjDFQAdA7AWBIIATBFQAFAXABAcIABAUIAAB4IAAAKQgLBUglA5Qh0C0jCBmQgxAZg3ARQg7AThFAKIgKABQhBAFhBgCQiRgDh9gaIh5gaQhAgNg2gXQgGgCgFAAQg0ACACgvQA2AVBCAKQCCATCMAIQAeACAdAEIALABIAoABQAyADBQgHQBHgHA0gTIAjgMQBvgjBVg/QBXhBA+hZQAegsAWg4QAKgbACgjQADhLgPhAQg3jribiMIgLgKQhOhIiJgJQicgMh8AXIgwAJIgLABQg8AFgqAOQh9AshxA0QgFAAgEgCQgGgDgFgFQAAgFACgBQBNgkAzg6QgBiBg5hJQg5hJhfgkQg2gUhDgEQhJgFhBAJQgjAFgbAKIgkAMQgzAUg8AQQivAshXCFIgFAFQgSgOAOgoQATgLAFgdIABgFQgZgUgdgSQgzgghZALQgaAEgZAKQgrAvgLBKIgBAJQAEBlAzAxQAWAVgMAJQgUgBgLgIIg+guQgpgfhCgEIgUAAQgPAAgMAGIitBUQAAAFgDADQhBBUg0BiQALAPAdgQQBGgnB4ANQBcAKAwA5QBGBPgTCqIgGAyQgKBkgpBCQglA8hNAYQhvABAGhqIACAGQAQAzA5AFQAkADATgQQAFgEAEgIQAGgMAKgKQAbgSAHgqIABgLIAJiLQAIiEg0hDQhEgmhSAQQgrAJglANQhXAvgsBbIgdA9QgKCgBABXQB+CoDKBbQAIAEAKACQA9AMBEgUQAzgOAxgWQCLg8BchsIBBhLIAKgKQAFgFADAEQAHALgGAMQgJAXgQATQgEAGgCAGQgDAJgEAHQg7BZhXBAQAGAiAgAMIAYAJQA2AYA4ARQA7ASBPgDQCJgEBag1QBTgxA7hLQAYh+AyhmQBhjFDdhEQA9gTBNADQCOAGBPBIQAdAaAZAdIAKAMQAzA+gQCEQgaA2gqAmQgCADAAAFQhPAzh5AGQhBADgmgaIgMgJQgdgagagdQAAgkALgYQAPgdAIAVQABADgBAFQgLBIA5AIQAxAgA+gSQA5gQAqgcQAZgUAUgYIAJgNQAcgngWgsQgqiKiogNQhIgGgxANQhZAXg8AzIAAAKQgFAKgIAFIgPAJQguAbgeAuQgnA7gWBTQgFAVgKAUQAAAKAEAIQABACAFAAQhZC1jTA5QhIAUhHAAQg7AAg6gOg");
	this.shape_21.setTransform(244.5,64.6302);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.clouds3, new cjs.Rectangle(-374.4,-75,772.0999999999999,221.9), null);


(lib.spotlight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(135,135,113,0.867)").ss(4,1,1).p("AAAAAIAAAA");
	this.shape.setTransform(134.1875,276.1875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(32,32,32,0.655)").s().p("AgNA4QgDg4gBg3IAbAAIAHAAIAAAEQgNADgOAAIAABhIAAAHIgDAAg");
	this.shape_1.setTransform(15,6.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(50,50,50,0.988)").s().p("AA7HvQg6g6g6g4IAAgOQgFjJACjMQABghgMgQIAAgHIAAkeIAAgHIAAhiQAOAAANgDIABgEQAYAAAYgEIAAgDIA4AAIAHAAIAAFJIAAAHIAADJQAADPAEDOQABAhgMAQQAAgDgCgCg");
	this.shape_2.setTransform(21.1787,50.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(32,32,32,0.647)").s().p("AgNAwQgDgwAAgwIAaAAIAIAAQAAABgBABQAAAAAAABQAAAAAAABQAAAAAAAAQgNADgNAAIAABTIAAAHIgEgBg");
	this.shape_3.setTransform(75.9,5.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,51,0.71)").s().p("AjtEGIgTgVQgkgqgRgxQgSgyAAg5QAAgtAMgpQAThHA3g4QAPgTARgSIAUgWQAyg5BsgkIABAAQA9gVAsgGIApgDIAHAAIAGAAQAjADAcAJIAIAEQATAOAXAIQAvArAMBTIAEAAQAkBSgTCNQgUCOhgBYQhgBYh/AAQiBAAhbhbg");
	this.shape_4.setTransform(89.1395,132.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(26,26,26,0.992)").s().p("Ao9HzQASgiAGgxIACgIQAUhXAWhRIAZhhIALgrQAHgWABgbQAOgOAEgbQADgVAFgVQAUhXAUhRQALgtAMgnQAGgUAEgVQAEgUAJgPQARgLAZgEQCzgbCxgeIB3gTIC1geIBxgSQA3gJA5gGIgxChIhUEYQgEAAgDgCQgpgXg5gmIgEgBQgMhSgvgrQgXgJgTgNIgIgEQgcgKgjgCIgGgBIgHAAIgpADIgPABQgLAAgIADQgOAGgQADQgLACgJADIgWAJIAAABQhsAjgyA5IgUAXQgRARgPATQg3A4gTBGIgHARQgFANAAAOQABAigMAPQAAA1ATAgIAKAQQARAyAkAqIBIB6IjLAwQhWAUhSAVQgHACgFADQgKAGgIAAQgNAAgGgQg");
	this.shape_5.setTransform(86.025,127.0916);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(129,129,129,0.996)").s().p("AirG4Ig6hJIhdh2QhdhyhihsIAAgHIAAhoQAMgPgBgiQgBgOADgOQAciaBihUQANAQgBAhQgDDNAGDIIAAAOQA7A4A6A6QABACABADQAMgQgBghQgFjNABjPIAAjKQAfgLAlgIIAYgFQAbgEAcgBIAxgDQApgDApADQAEAAADAEQBfBhBaBoQABABADAAQAjAjAgAoIAPASIAzA2QBCBSBJBJQABACAAADIh3ATQiyAeiyAbQgaAEgQALQgIAQgEAUQgFAUgGAUQgMAogLAsQgUBSgTBXQgGAVgCAWQgFAbgNAOIg5hGg");
	this.shape_6.setTransform(51.4,81.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(50,50,50,0.98)").s().p("AATETIgPgTQgegngjgjIgBgHQgKi/AEjPIAAgHIAAhUQAOAAANgDQAAAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAgBQAYAAAXgDIAAgEIA4AAIAHAAIAAGcIAAD1Igzg2g");
	this.shape_7.setTransform(81.7698,32.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,153,0.22)").s().p("EgILBJaIgOgbQjPlwjDl/QjLl9jHmGImTsPQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQghhEgihCQiVkbiOkkQiTkjiPkoIgohTIgyhmQhKiXhIiXIgTgoIghhFIABAAIhDhhIhDhjIgEAFIgMgdIgIgLIACgCQgVgtgWgtQhmjHhfjQIgkhMMgZugxnIgBgBIg4hfIiYkEQg6hng8hkIiZkEQhNiChPh/IhIh7IATAVQBbBbCBAAQCAAABghYQBghYAUiOQATiOgkhSQA5AmApAYQADABAEAAQA4AwBFAlQANAHALAJIAKAHQA9ArBBAoICBBPQBPAxBJA0QBBAkA9ApID6CjQB9BRB/BRQBeA7BaA/IgBABQBZAwBTA2IFjDhIECChMB/2A3/MhapBUiQjSnvg7hsgEhWXhLQQgTghAAg0QAMgQgBghQAAgOAFgNIAHgRQgMApAAAuQAAA5ASAyIgKgQgEhRghSiQAJgEALgCQAQgCAOgGQAIgEALAAIAPAAQgsAGg+AVIAWgJg");
	this.shape_8.setTransform(609.925,627.3375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.spotlight, new cjs.Rectangle(0,0,1164.6,1157.5), null);


(lib.Scene_1_Theater = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Theater
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(-102.05,-139.8,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(-843,-308,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(-843,-308,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_5();
	this.instance_3.setTransform(-843,-308,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},417).to({state:[{t:this.instance_2}]},177).to({state:[{t:this.instance_3}]},1).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_shirt = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// shirt
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCC66").ss(1,1,1).p("AgJgkQAJAkAKAl");
	this.shape.setTransform(719.7,420.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(4,1,1).p("AhHBKQgDASgGARQgGAMgIALQgdAtg0AHQgzAHgrgiQgqgkgIg5QgBgMAAgLQAAgTAEgRQAGgWAOgUQAeguA0gHQAqgGAjAWQAIAFAHAHQAeAaAOAkADBi4QAEABAEABQAEABAEABQAbAHAQAIQABABACAAQANAHAGAIQADADABAEQAOAOAKARQAEAIAEAJQAHARADAUQAHAxgWAoQgBADgCACIAAAAQgCAEgDADQgUAegeANQgPAGgQADQgzAHgrgiQgNgMgKgMQgEgGgEgHQgNgZgFgdQgDgXACgTQAEghATgcQANgUASgNQALgIAOgFQAEgCAFgBQAIgDAJgBQACAAACAAABVA1QgDACgCADQgbAbgrAHQgQACgQgCIgKgBIgNgE");
	this.shape_1.setTransform(672.422,396.784);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF6600").ss(4,1,1).p("ADpnPQALBHAOBfQBCGvBKF9QAKgBAKgBQADgBADAAIACAAAG0H/IAigEQhrn4g/nxAnOnLQgEgTgEgTIA0gfQBnI4A3HoAkFIRIgiAAQgjAAgCAAIgNAAQggnohTnn");
	this.shape_2.setTransform(672.7,455.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AAAAAIAAAAIABAAIAAAAg");
	this.shape_3.setTransform(605.025,368);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AlBHqQgHAAgEgCQgHgDgCgLQgCgIAFgHQAFgIAJABQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAAAAAQAMABAGAKQAGALgIAJIgHAHIgEABIgCABIgCgBgAGqHUQgHAAgEgCQgHgEgCgJQgCgKAFgGQAFgIAJAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAMABAGALQAGALgIAKIgHAFIgEACIgCAAIgCAAgAmsm+IgIgCIgIgLQgBgCABgDIAAgFIAAgBIAAgHIADgEIAGgGIABAAQAEgCAEABIAAgCQAIADADACIAHAIQAEAIABAEIAAAEQgBADgEAFQgEAFAAADg");
	this.shape_4.setTransform(672.5202,456.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF3333").s().p("AjNCrQgKAAgLgDIgLgFQgIgDgCgHQgCgDABgEQgHgGgEgJQgFgHAEgDIABgBIABgDQACgDADAAQAFAAACACIACAAIALAEQAKAEAGAAIAFgBIAHABIATgDQAHAAADABQAIAAAGAEQAMAHgBAKQAAAFgDAEIAAACQAAAFgJAEIgMADIgCAAIgGACQgIADgIAAIgGAAgADfhmIgFgBIgJgCQgJgGgGgBQgJgDgLADIgZAGQgJADgEAAIgJgBQgFgDgDgDQAAgBgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIgBAAIgBgCIgBgJIAAAAIAAgDIADgBQABgEAFAAIADAAQgEgNAGgFQADgEAGgDQAKgEAKgCIAJgEIASgCIAKgCIAMABIAGABIACAAQARAEANAGIADACQAGADACAEQAFAEgBAIQAEAEgBAFQAAAMgGAFQgCACgDABIgDACQgIAFgJAAIgJgBg");
	this.shape_5.setTransform(672.1892,397.0938);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AkNCdQgqgkgIg5QgBgMAAgLQAAgTAEgRQAGgWAOgUQAeguA0gHQAqgGAjAWQAIAFAHAHQAeAaAOAkQAAgKgCgLIgCgMIAAgBQAbgbAqgGQAVgDAVAEIARAFIAIADIADACQgCATADAXQAEAdAOAaIAHAMIgEAEQgcAcgqAGQgQADgPgCIgKgBIgNgEIgFgCQgIgDgIgEIgFgEQgDASgGARQgGAMgIALQgdAtg0AHIgRABQgpAAgkgcgAkFB4IAAADIgCABQgEADAFAHQAEAJAHAGQAAAEABADQACAHAIADIAMAFQAKADALAAQALACALgFIAGgCIABAAIAMgDQAKgEAAgFIAAgCQACgEABgFQABgKgMgHQgHgEgIAAQgDgBgHAAIgTADIgGgBIgGABQgGAAgJgEIgLgEIgCAAQgCgCgFAAQgEAAgCADgAB6BFIgXgYIgIgNQgNgZgFgdQgDgXACgTQAEghATgcQANgUASgNQALgIAOgFIAJgDIARgEIAEAAIAIgFIAEgBIAIACIAIACQAbAHAQAIIADABQANAHAGAIQADADABAEQAOAOAKARIAIARQAHARADAUQAHAxgWAoIgDAFIAAAAIgFAHQgUAegeANQgPAGgQADIgSABQgpAAgjgcgAC/htQAHABAIAGIAKACIAFABIAJABQAIAAAJgFIACgCQADgBACgCQAHgFAAgMQAAgFgDgEQAAgIgEgEQgDgEgFgDIgDgCQgOgGgRgEIgCAAIgFgBIgMgBIgLACIgRACIgKAEQgJACgKAEQgGADgEAEQgFAFADANIgDAAQgEAAgCAEIgDABIABADIgBAAIABAJIABACIABAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAABABAAQACADAGADIAIABQAFAAAIgDIAZgGIALgCIAJACg");
	this.shape_6.setTransform(672.422,396.784);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCCC66").s().p("AhZK1QgKgCgdgNQgkgPgZgGQgZgGgggBIgqgBQg4nphmo4IAbgPIAVgLIAPgHIAQgHIAUgLQgFARAAATQAAALACAMQAIA5AqAkQArAiAygHQA0gHAdgtQAIgLAGgMQAHgRACgSIAGAEQAHAEAJADIAFACIAMAEIAKABQAQACASgCQApgHAcgbIAEgFIAXAYQArAjAzgIIABAAIAFAAQAOAAAOASIAaCmQBBGuBLF+Ik0AmQg6AHgcAGIggAGIgQABQgKAAgHgBgAg2IDIACAAIAAgBIgCABgAnSKoIgGgCIgHgCIgGgCIgBgBIgBgBIgFgEIgDgDIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgCIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIABgCIAAgBIAAgBIABgBIAAgBIABgCIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIACgNIAAgBIAAgBIAAgBIAAgBIAAAAIABgBIAAgDIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgOIAAgIIgEhIQgGhXADgvIAEgjQACgUAAgOQAAgegPhAQgLgvgJgaIgCAEIgFAMIgGANIgPAZQgDAFgDACQgEADgFABIgEADQgVAPgeAGIgPADQgUAEgWADQgvAEhNgNQgQgCgIgFQgOgHgBgMIgCgDQgFgLANgYQALgUAEgNIAKgaQAGgOAHgIIADgEQANghASgmQADgKAEgFIABgBIAqhOQAYgsANgTQAWgiAXgVIAIgHQAGgHAJgEQAPgLASgLIA9gjQAMgHAJgCIAHAmIAAAFQAAADABACIACADQBSHnAgHpIgTAAIAAABIgBAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIgBACIAAAAIAAAAIgBABIAAAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIgBAAIgDADIgFAEIgBABIgCAAIgFADIgBAAIgFABIAAABIgGAAIgBAAIgCAAIAAABIgiAAgArzApIABABIAAgCIgBABgAEPl2QgEgggBgDIADgEIAEgHIABAAIACgFQAWgpgHgxQgEgYgJgUIgIgRQgJgRgPgOQgBgEgDgDQgGgHgNgHQAEgKgEgfIAhgIIARgEQBWgQBoAFQApABAXALIADABQAPABAPAGQAMAFAPAKIAZASIAnAcQAKAIATATQAtAtAUAYQAPARAIAQQAcAcAVAfIAGAJQAkA6gLArQgFATgWAeQgdAngSAUQgcAfgdAQQggARgmABQgnACgggQQgTgJgdgYQgwglgxgpIgDgDIABADIAJAjIANAoIAPAqQANApACAfIADAFQAKAXAJAwQAMA/AoCsQAiCUAOBYQAEAXAAAOQgBAMgEAKQAEAHACAIQAFASgFARIgBAFIABAGIgCAKIgDAFQgHALgQADQgLACgTgBQglgBhHAHQhsn3g/nygAiZoPQgIgHgIgFIAKgDQAMgDAFgDIALgJIABAAQADgCAGgBIALgBIBOAAQAOAAAHgDQALgDAMgNIAcgeQAKgMAIgCIACAAIABgBQAHgDAOgBQAQgBAVgGQgNAFgMAIQgbAOgSAcQgTAbgDAhIgEgCIgJgDIgQgFQgUgEgWADQgrAGgaAbIAAABIACAMQABALAAALQgNglgegagACUqHIABAAIAIAAIgIAEIgEAAIgRAEIAUgIg");
	this.shape_7.setTransform(675.5933,443.2613);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF6600").s().p("AlZKUQggnphSnnIAFAIIAFABIATACIAAgBIAQABQAAgDAEgEQAFgGAAgCIAAgFQgBgEgEgHIgGgJQgEgCgIgCIAAACQgEgBgEACIgIgDIAAACQgEgCgEADIgHAFIgCAFIgBAHIAAABIgHgmIAzggQBnI4A3HpIAAABIgjAAIglAAgAlGJQQgJAAgFAIQgEAGABAJQACAKAHADQAFACAGAAQABABAAAAQABAAAAAAQABAAAAAAQABAAAAgBIAEgBIAHgGQAIgKgGgLQgGgKgMgBQAAAAAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAgAEDimIgaimQAKgSAJgMQAYgLASgZIAGAjQA+HxBsH3IgiAFIgGAAIgEABIgCAAIgGABIgUACQhKl+hBmugAGlI6QgIAAgGAIQgEAGABAJQACAKAHAEQAFABAGABQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAIADgCIAHgGQAIgJgGgLQgGgLgMgBQAAAAAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAgAD6psIgJgHQgHgGASgaQAEAfgEAKIgCgCgADGp9IAPACIgHAAIgIgCgADpqBIgFgCIgDAAIgDgBIgHgBIgJgBIAugNIgSAXIgBgFg");
	this.shape_8.setTransform(672.7,442.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgDAyIAAAAIAAgBIAAgBIAAgCIAAgBIABACIAAABIABAAIAAABIABAAIgBABIAAAAIgCAAgAACgpIAAgCIABgBIAAgBIAAgBIAAgCIABgBIgCAJIAAgBg");
	this.shape_9.setTransform(547.925,259);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF9966").s().p("AAAABIABgBIAAABIgBAAgAAAAAIAAAAIAAgBIAAABIAAAAg");
	this.shape_10.setTransform(547.75,263.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CCCC66").s().p("AhZK1QgKgCgdgNQgkgPgZgGQgZgGgggBIgqgBQg4nphmo4IAbgPIAVgLIAPgHIAQgHIAUgLQgFARAAATQAAALACAMQAIA5AqAkQArAiAygHQA0gHAdgtQAIgLAGgMQAHgRACgSIAGAEQAHAEAJADIAFACIAMAEIAKABQAQACASgCQApgHAcgbIAEgFIAXAYQArAjAzgIIABAAIAFAAQAOAAAOASIAaCmQBBGuBLF+Ik0AmQg6AHgcAGIggAGIgQABQgKAAgHgBgAg2IDIACAAIAAgBIgCABgAnSKoIgGgCIgHgCIgGgCIgBgBIgBgBIgFgEIgDgDIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgCIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIABgCIAAgBIAAgBIABgBIAAgBIABgCIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIACgNIAAgBIAAgBIAAgBIAAgBIAAAAIABgBIAAgDIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgOIAAgIIgEhIQgGhXADgvIAEgjQACgUAAgOQAAgegPhAIgBgEIgCABQgMAJgSAEIgOADIgWAIIgSAEIguACQgWAAgLgCIgJABQgvAEhNgNQgQgCgIgFQgOgHgBgMIgCgDQgFgLANgYQALgUAEgNIAKgaQAGgOAHgIIADgEQANghASgmQADgKAEgFIABgBIAqhOQAYgsANgTQAWgiAXgVIAIgHQAGgHAJgEQAPgLASgLIA9gjQAMgHAJgCIAHAmIAAAFQAAADABACIACADQBSHnAgHpIgTAAIAAABIgBAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIgBACIAAAAIAAAAIgBABIAAAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIgBAAIgDADIgFAEIgBABIgCAAIgFADIgBAAIgFABIAAABIgGAAIgBAAIgCAAIAAABIgiAAgArzApIABABIAAgCIgBABgAEPl2QgEgggBgDIADgEIAEgHIABAAIACgFQAWgpgHgxQgEgYgJgUIgIgRQgJgRgPgOQgBgEgDgDQgGgHgNgHQAEgKgEgfIAhgIIARgEQBWgQBoAFQApABAXALIADABQAPABAPAGQAMAFAPAKIAZASIAnAcQAKAIATATQAtAtAUAYQAPARAIAQQAcAcAVAfIAGAJQAkA6gLArQgFATgWAeQgdAngSAUQgcAfgdAQQgRAJgTAFQgeASgiAKQgiALg2AHQgfAEgTgBIAAAAIACATIADAFQAKAXAJAwQAMA/AoCsQAiCUAOBYQAEAXAAAOQgBAMgEAKQAEAHACAIQAFASgFARIgBAFIABAGIgCAKIgDAFQgHALgQADQgLACgTgBQglgBhHAHQhsn3g/nygAiZoPQgIgHgIgFIAKgDQAMgDAFgDIALgJIABAAQADgCAGgBIALgBIBOAAQAOAAAHgDQALgDAMgNIAcgeQAKgMAIgCIACAAIABgBQAHgDAOgBQAQgBAVgGQgNAFgMAIQgbAOgSAcQgTAbgDAhIgEgCIgJgDIgQgFQgUgEgWADQgrAGgaAbIAAABIACAMQABALAAALQgNglgegagACUqHIABAAIAIAAIgIAEIgEAAIgRAEIAUgIg");
	this.shape_11.setTransform(675.5933,443.2613);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_11},{t:this.shape_6},{t:this.shape_5},{t:this.shape_8},{t:this.shape_4},{t:this.shape_9},{t:this.shape_10},{t:this.shape_3},{t:this.shape_1},{t:this.shape_2}]},135).to({state:[{t:this.shape_11},{t:this.shape_6},{t:this.shape_5},{t:this.shape_8},{t:this.shape_4},{t:this.shape_9},{t:this.shape_10},{t:this.shape_3},{t:this.shape_1},{t:this.shape_2}]},16).to({state:[]},229).wait(219));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_nose = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// nose
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663300").ss(10,1,1).p("AD1iJInpET");
	this.shape.setTransform(580.075,367.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},380).wait(219));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hat = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hat
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(534.7,222.5,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF6600").ss(12,1,1).p("AMgABQAEAHAAAHQgCAvi8gSQgZgCgcgDQixgWjngYQgagCgagDQg6gGg8gHQkOgcjPAGQg1ACgwAEQg0AEgpABQhPABgkgM");
	this.shape.setTransform(621.075,295.3446);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEAlIgFgCIgBgBIAAAAIAAAAIAAABIAAgBIgBAAIgBgBIgCAAIgCgBIAAAAIAAAAIgGgHQgDgFgBgHIABgNIAAgLIABgKQABgDADgDIABAAIABgBIABgBIABgBIABAAIABgBIABAAIACgBIAEgBIABAAIADAAIAAAAIADAAIAAgBIACgBIABgBIABAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABIACABIABAAIAFAEIABABIACACIAAABIABACIAAABIAAAAIACABIABACIAAADIAAABIADAIIABAJIgCAJIgCAJIgEAFQgDACgEABIgBABIgCAEIgEADQgCACgDAAIgEAAgAgMgMIgBABIAAABIABAAIAAAAIABABIgBgDgAAUgWIABABIAAAAIgBgBgAAKAeIABAAIgBABg");
	this.shape_1.setTransform(555.275,272.6688);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF6600").s().p("AKHBuIg1gGQixgWjmgYIg0gGIhIgHIgvgFQkYgdjVAIQgsACgpADIhdAFQgzAAghgEQgIADgHAEIgPANQgHAGgGACIgEABIgFACQgIABgIgCQgKgDgHgHIgFgFQgHgKAAgPQgBgNAIgKQAFgHAMgKQAJgIAFgDIAHgEIALgEQAUgIAKgDIANgBQAggMAxgKIABAAIABAAIACgBIAJgBIBRgOIANgBIALgBIA9gHIANgBQAvgFAygDIAWABQBxADBEgEIAygCQAnAAApADQApABArADQFMAXB0AgIBWAYIAqAKQADAFADACIACABQAIAEAJgGIAKADIAWAFQBdAXAlAaQAWAPACAQIAAAEQgBAOgTAJQgZAMg5AAQglAAgzgFg");
	this.shape_2.setTransform(619.3735,285.1111);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9966").s().p("AKBD+IgLgDQgIAHgJgFIgBAAQgEgDgDgFIgpgKIhWgYQh1gglLgXQgqgDgrgBQgogCgnAAIgyACQhEADhxgCIgXgBQgyADgvAEIgMABIg9AHIgLACIgNABIhSANIgCgGIAEAAQAEAAADgCIAEgDIABgEIACgBQADgBADgCIAEgFIADgJIABgJIgBgKIgCgIIAAgCIgBgCIgBgCIgBgBIAAAAIgBgBIAAgCIgBgCIgCgBIgBgBIgEgEIAAgBIAAgBIAAgBIABgBIAAAAIABgBIAAgBIABgBIAAgBIABAAIAAgBIAAgCIABgBIAAAAIABgBIAAgBIABgBIAAgBIABAAIAAgBIAAgBIAAgCIABAAIAAgBIABAAIAAgBIABgBIAAAAIABgBIAAgBIAAAAIABgBIAAgBIABgCIAAAAIAAgBIABgBIAAgBIABAAIAAgBIABgBIAAgBIAAgBIABAAIABgCIAAgBIABgBIAAAAIABgBIAAgBIAAgBIABgBIAAAAIABgBIABgBIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIABAAIABAAIAAgBIABgBIAAgBIABAAIAAgBIABgBIABgBIAAAAIABgCIAAAAIAAgBIABgBIAAgBIABAAIAAgBIABgBIABgBIABgBIAAAAIAAAAIABgCIAAAAIABgBIAAgBIABAAIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIAAgCIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAAAIABgBIABgBIAAgBIABgBIAAgBIABgBIAAgBIABgBIAAAAIABgBIAAgBIABAAIAAgBIABgBIABgDIABgCIACgDIAAgDIABgDIABgDIABgEIABgCIAAgDIABgEIABgCIABgDIAAgEIADgKIACgMIACgOIADgLIAAgBIAAgBIABAAIAAgBIABgBIAAgBIABgCIABgBIAAAAIABAAIAAgCIABgBIAAAAIABgBIABgBIAAgBIAAgCIABgBIAAgBIABAAIABAAIABgBIAAgBIAAgBIACgBIAAgBIABgBIAAAAIABgBIAAgCIABAAIABgBIABgBIAAgBIABgBIAAgBIABAAIABgCIAAgBIABgBIAAAAIABAAIABgCIAAgBIABgBIAAAAIABgBIABgBIAAgCIAAAAIABAAIABgBIAAgBIABgBIABgBIAAgBIABgBIAAgBIABgBIABAAIAAgBIABgBIABgBIAAgBIABAAIABgBIAAgCIABAAIAAgBIABgBIABgBIAAgBIABAAIABgBIAAgBIABAAIAAgCIABAAIABgCIABgBIABAAIABgBIAAgBIAAgBIABgBIABAAIABgBIAAgBIAAgBIABgBIABgBIAAgBIABgBIABAAIAAgBIAAgBIABAAIAAgCIABgBIABgBIABgBIAAgBIABAAIAAgBIABgBIAAAAIAAgBIABAAIAAgBIABAAIABAAIAAgCIAAgCIABgBIABAAIABAAIAAgBIABgBIAAgBIABgBIABAAIABgCIABAAIABgCIAAAAIABgCIABAAIAAAAIABgCIABAAIAAgBIAYgNQA/geBJgKQB+gUCZApIBIAVQArAMAeAEQAnAGBjgCQBYgCAxANQAhAHAgAQQAwAWAtAoQBUBJAlBcQAVAyADA0QAEAtgJAoIgVgFgAqKCqIAAABIAAgBIAAAAgAqAB1IAAAAIAAABIAAAAIAAgBgAqbBqIAAgCIAAgBIABgBIAAgBIAAgBIABAAIgBgCIABgBIAAgBIAAABIABAJIgBAAIgCAAgAqSBjIAAgHIAAgHIAAgHIABgJIAAAAIABgBIAAgBIAAgBIAAAAIAAAAIABAAIAAgBIAAAAIAAAAIAAADIAAACIgBACIAAACIAAACIAAACIAAABIAAABIAAABIgBACIAAABIAAAAIAAABIAAACIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIgBACIAAAAIAAABIAAABIAAABIgBAAIABgEg");
	this.shape_3.setTransform(621.426,258.6998);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("AgxDqIgBgJIAAgBIAAgBIAAgCIAAgCIAAgHIAAgMIAAgOIAAgMIAAgMIABgOIADgLIAEgMIABgCIAAgCIAAgBIAAgBIABgCIAAgBIAAgCIAAgBIAAgCIABgBIAAgBIAAgBIABgBIAAgCIABgBIAAgCIAAgCIABgCIAAgDIAAgBIAAgCIABgBIAAgBIABgBIAAgBIABgBIAAgBIABgCIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIABAAIAAAAIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIABgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAgBIAAAAIAAgCIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAAAIAAgBIABAAIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIAAgCIAAgBIABAAIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIABAAIAAgBIABgBIAAgBIABgBIAAAAIABgBIAAAAIABAAIAAgBIABAAIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAAAIAAgBIABgBIAAgBIABgBIAAAAIABgBIABAAIAAgBIAAAAIABgBIAAgBIABAAIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABAAIAAAAIABgBIAAAAIAAAAIACgBIABgCIABgCIABgBIABgCIABgBIAAgBIABgBIABAAIABgCIAAgBIABgBIABgBIABgBIABgBIABAAIAAgBIABgCIABgBIABgBIAAgBIABgBIABgBIAAAAIABgBIAAAAIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABAAIAAgBIAAgBIAAAAIAAgBIABgBIAAAAIAAAAIABgBIAAAAIABgCIAAgFIABgDIABgFIABgDIABgFIAAgDIABgFIACgEIABgEIACgEIABgBIAAgHIAAgHIAAgFIAAgIIABgHIAAgGIAAgHIABgIIAAgHIAAgHIAAgDIABgFIAAgHIAAgFIAAgBIAAgCIAAgDIAAgCIAAgCIAAgBIAAgDIAAgCIAAgCIAAgCIAAgCIAAgCIAAgDIAAgBIAAAAIAAgCIAAgEIAAgCIAAgCIAAgCIAAgCIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgCIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgCIAAgBIAAAAIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIABABIAAACIABACIACADIABADIAAACIAAADIABAEIAAACIABAEIAAADIABACIAAABIAAADIAAADIAAADIAAABIAAABIAAABIABABIAAABIAAABIAAAAIABAJIAAAJIABAIIAAACIAAAHIABAKIgBAJIAAAJIABALIAAAJIAAAJIAAAIIAAAKIAAAGIAAABIAAABIAAABIAAAKIAAANIAAAMIAAANIgCANIgBALIgDAMIgCALQgCAEgBAGIAAAAIAAACIgDALIgCAOIgCAMIgDAKIAAAEIgBACIgBADIgBAEIAAACIgBADIgBAEIgBADIgBADIAAADIgCACIgBADIgBADIgBACIAAAAIgBABIAAABIgBAAIAAABIgBABIAAABIgBABIAAABIgBABIAAABIgBAAIgBABIAAABIAAABIgBABIAAABIAAABIgBABIAAABIAAABIgBAAIAAABIAAABIAAABIgBABIAAACIAAABIAAAAIAAABIgBABIAAABIAAAAIgBABIAAABIgBABIAAAAIgBACIAAAAIAAAAIgBABIgBABIgBABIAAABIAAAAIAAABIgBABIAAABIAAAAIgBACIAAAAIgBABIgBABIAAABIgBAAIAAABIgBAAIAAABIgBABIgBAAIAAABIAAABIAAABIAAABIgBABIAAABIAAAAIAAABIAAABIgBABIAAABIAAABIgBABIgBABIAAAAIgBABIAAABIAAABIgBAAIAAABIgBABIAAABIgBACIgBAAIAAABIAAABIgBABIAAAAIgBABIAAABIgBABIAAABIAAAAIgBACIAAABIgBABIAAAAIAAABIgBABIAAAAIgBABIAAAAIgBABIAAABIgBAAIAAACIAAABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAACIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIAAABIAAABIgBAAIgCgCQgBAAAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIgBABIAAgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgCIAAgDIAAgBIABgCIAAgCIAAgDIAAAAIAAAAIAAABIgBAAIAAAAIAAAAIAAABIAAABIgBABIAAAAIgBAJIAAAHIAAAHIAAAHIgBAEIgCACIAAABIgDAAg");
	this.shape_4.setTransform(559.925,245.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AAABoIAAgBIgBgCIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIgBgCIAAgBIAAgBIAAgBIgBgCIAAgBIAAgDIgCgMIgCgNIgBgNIgBgNIABgOIgBgMIAAgNIAAgOIABgOIABgNIABgPIABgNIADgOIACgHIAAgBIAAAAIABgBIAAgBIAAAAIAAAAIABgBIABgBIAAAAIABAAIAAAAIABABIABABIABAAIABACIAAABIABABIABACIAAABIABACIAAABIAAABIAAABIABACIAAACIAAACIADAMIABANIABANIAAAOIAAAMIAAAOIAAAMIAAAOIAAANIgBAPIgBANIgBAOIgDANIgCAIIgBABIAAABIAAAAIgBABIAAAAIAAABIgBABIAAAAIgBABg");
	this.shape_5.setTransform(1306.9,370.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},90).to({state:[{t:this.shape_5}]},290).to({state:[]},1).wait(218));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hair = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AgFhlQgHBsAUBf");
	this.shape.setTransform(556.839,329.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AodHIQgJgEgCgDIgHgJQgIgOgDgMIAAgBQgFgSgLgbIgRgtQgSg0AFglIgCgKQAAgGACgEQgzgOgwgVIgWgLQgTgFgTgQIgFgDQgGgDgCgFIgCgBIgCgBIAAgBIgEgDIgDgEIAAAAIgCgCIgBgBIgBgBIgDgDIgDgGIgDgCIgBgDIgBAAIgCgDIgCgDIAAgBIgCgCIgCgEIAAAAIgBgCIgBgCIAAgBIgBAAIAAgBIAAAAIgBgBIAAgBIAAAAIAAgBIgBAAIAAgBIgBgCIgBAAIAAgBIAAgBIAAAAIABABIAAAAIABABIABABIABABIABAAIABABIABAAIABAAIABAAIABABIACAAIAAAAIAAABIAOgDIAMgCIAcgGQAXgGAZgPIAJgGQAQgLAigbIBfhPIAtgnQBBg4AzgyIATgTIA0g1QAegeAYgTQBkhPCYgcQA9gMBLgDQA5gDBRACQBGACAkAKQAkAJBAAiQBcAwAqAeQBIA1A0BLQApA8AXBEIALAhQAJAjAHAuIAKBTIANB+QAGA5gYATIgCABQgPAKgagDQgXgBgVgHQgYgIgXgOQgqgbgYgqQgLgSgghaQgYhDgjgcQgRgNgZgJQgPgGgegIIhmgaIgTgBQgEAAgCgBIAAgBQgxBPhiA5QgtAag7AWQgqAQhCAVQhnAgg7AIQgqAGg1AAQgdABgygCIgQgBQhLgDglgFIgagDQgHBtAVBeQADABACAFIADALQACAIgEACIgCABIgFgCg");
	this.shape_1.setTransform(611.7388,296.4135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},380).wait(219));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Symbol10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(63.0728,6.0149,0.9999,0.9999,33.5179);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(45.1158,33.3982,0.9999,0.9999,33.5179);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(63.0728,6.0149,0.9999,0.9999,33.5179);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(45.1158,33.3982,0.9999,0.9999,33.5179);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#77422C").s().p("ABxCSIgKgBIgLgEQgSgGgbgPIgDgCQhwg/h7hYQgtgigTgUIgEgGQgRgWgHgXQgCgEAAgFIgCgDIAAgDQDOC5CdAsQB4AgBcgzQgFAMgHAMIgNAPQgTAWgcAQQgXANgcAGIgOABQgUAAgSgIg");
	this.shape_4.setTransform(29.275,87.8204);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#813E0C").s().p("ABICvQidgsjOi5QgHgUAEgWQACgVANgUQANgTAUgKQASgLATgEQAUgEAEADQALgEAJAAQAKABAWAVQBlBbBmA9QBmA7AAg/QABhAAqAnIADACQAuApARAjQASAkgDAkQgBAZgLAWQg4AfhDAAQgqAAgvgMg");
	this.shape_5.setTransform(29.6711,77.9456);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(0,-6,77,109.2), null);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(19.2865,2.0666,0.9999,0.9999,0.2142);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(19.3141,34.8141,0.9999,0.9999,0.2142);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(19.2865,2.0666,0.9999,0.9999,0.2142);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(19.3141,34.8141,0.9999,0.9999,0.2142);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#77422C").s().p("AiZBcQg4gDgcgHIgGgCQgagJgSgPIgIgHIgDgCIgBgCQETAqCagzQB2gmAxhcQADAMAAAPQAAAKgCAKQgEAcgPAcQgMAYgUATQgWATgaAFIgIAEIgLADQgTAFgfACIgDAAQhHAFhLAAQhBAAhFgDg");
	this.shape_4.setTransform(33.575,87.3829);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#813E0C").s().p("AkXB9QgSgNgJgUQgKgTABgYQAAgXALgUQAJgSAPgNQAOgPAEAAQAIgJAHgEQAJgFAeAFQCHAVB1gGQB3gGgjg2Qgig1A4AJIAEAAQA9ALAiATQAiAUASAgQAMAWAEAYQgxBbh2AnQhWAch4AAQhkAAh7gTg");
	this.shape_5.setTransform(31.6488,79.3646);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,-6,63.6,102.9), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfDjIjQhSICTlzIDQBSg");
	this.shape.setTransform(10.9281,20.0991,0.9128,0.9999,-21.4884);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AiwCRICSlzIDPBSIiSFzg");
	this.shape_1.setTransform(10.9281,20.0991,0.9128,0.9999,-21.4884);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-6,-6,33.9,52.2), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape.setTransform(19.6359,36.567,1,1,1.7515);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape_1.setTransform(19.6359,36.567,1,1,1.7515);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-6,-6,51.3,85.1), null);


(lib.thigh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ABKDCIjMggIA5ljIDMAgg");
	this.shape.setTransform(13.05,19.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AiCCiIA5ljIDMAgIg5Fjg");
	this.shape_1.setTransform(13.05,19.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.thigh, new cjs.Rectangle(-6,-6,38.1,50.9), null);


(lib.pents5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("AmSA7IJMmnIDZEyIpMGng");
	this.shape.setTransform(40.275,36.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AmSA7IJMmnIDZEzIpMGmg");
	this.shape_1.setTransform(40.275,36.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pents5, new cjs.Rectangle(-6,-6,92.6,84.9), null);


(lib.pents3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("Ah9mEIFwA/Ih1LKIlwg/g");
	this.shape.setTransform(24.325,38.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjyFGIB1rKIFwA/Ih1LKg");
	this.shape_1.setTransform(24.325,38.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pents3, new cjs.Rectangle(-6,-6,60.7,89.9), null);


(lib.pents_only = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape.setTransform(20.725,39.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape_1.setTransform(20.725,39.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pents_only, new cjs.Rectangle(-6,-3.5,53.5,86.2), null);


(lib.pants2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AjAiaQAFgJANADQANACAMAIIFKEJQAIAGAHAJQAAADABACQADANgFAHQgIAIgMgBQgHgBgHgFQgFgCgHgFIlJkHQgMgKgEgKQgEgMAIgIg");
	this.shape.setTransform(19.8527,16.1784);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pants2, new cjs.Rectangle(-6,-6,51.7,44.4), null);


(lib.legR_normal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-90.7,-100.1,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_15();
	this.instance_1.setTransform(-82.35,73,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legR_normal, new cjs.Rectangle(-90.7,-100.1,71.9,205.1), null);


(lib.legL_normal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-88.35,-99.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_13();
	this.instance_1.setTransform(-105.4,73,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legL_normal, new cjs.Rectangle(-105.4,-99.5,68.60000000000001,204.5), null);


(lib.legshoegirlR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FF3300").ss(0.1,1,1).p("AiYAXQCvA9CChDQgcg3g5gN");
	this.shape_4.setTransform(26.075,74.766);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFCC99").ss(0.1,1,1).p("AhmARIDJggIAEgB");
	this.shape_5.setTransform(21.025,75.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#5D3300").ss(0.1,1,1).p("AAKgUQAAAAAAAAIgTAp");
	this.shape_6.setTransform(31.875,71.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC99").s().p("AiYAXIDIggIAEgBIgEABIAUgqQA5ANAcA3QhEAjhRAAQhIAAhUgdg");
	this.shape_7.setTransform(26.075,74.766);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0033CC").s().p("AjCBwQgVgNgMgZQgEgIgDgLQgHgRgCgNIABgOIgBgQQABgSABgLIACgJQAEgRALgNQALgOAPgIQAPgHASAAQARAAAQAIQAHADAGAGIAjAAQAWABAPgCQAMgBAQgEIAagHIAjgFQAGgGAKgEIADgBIAEgCQAJgEAPAEQAbAAAZAKIAHACIAZAKQAhANAPAQQANANAGATQAGATgDASQgDAQgMAUQgQAZgUAOQgLAJgUAIQhUAihrgaQgdgIgRgMIgIgDQgNgGgNgKIgDAGQgGAPgFAHQgJAPgNAGQgKAFgLAAQgNAAgOgHgAAmhHIjIAhQCvA8CChCQgcg3g5gOIAAAAIAAAAg");
	this.shape_8.setTransform(27.0529,80.9408);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legshoegirlR, new cjs.Rectangle(-2.4,-5.9,53.9,98.80000000000001), null);


(lib.legshoegirlL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FF3300").ss(0.1,1,1).p("AiYAXQCvA9CChDQgcg3g5gN");
	this.shape_4.setTransform(26.075,74.766);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFCC99").ss(0.1,1,1).p("AhmARIDJggIAEgB");
	this.shape_5.setTransform(21.025,75.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#5D3300").ss(0.1,1,1).p("AAKgUQAAAAAAAAIgTAp");
	this.shape_6.setTransform(31.875,71.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC99").s().p("AiYAXIDIggIAUgqQA5ANAcA3QhEAjhRAAQhIAAhUgdgAAwgJIAEgBg");
	this.shape_7.setTransform(26.075,74.766);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0033CC").s().p("AjCBwQgVgNgMgZQgEgIgDgLQgHgRgCgNIABgOIgBgQQABgSABgLIACgJQAEgRALgNQALgOAPgIQAPgHASAAQARAAAQAIQAHADAGAGIAjAAQAWABAPgCQAMgBAQgEIAagHIAjgFQAGgGAKgEIADgBIAEgCQAJgEAPAEQAbAAAZAKIAHACIAZAKQAhANAPAQQANANAGATQAGATgDASQgDAQgMAUQgQAZgUAOQgLAJgUAIQhUAihrgaQgdgIgRgMIgIgDQgNgGgNgKIgDAGQgGAPgFAHQgJAPgNAGQgKAFgLAAQgNAAgOgHgAAmhHIjIAhQCvA8CChCQgcg3g5gOgAA6hxIAAAAIAAAAIAAAAIAAAAg");
	this.shape_8.setTransform(27.0529,80.9408);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legshoegirlL, new cjs.Rectangle(-2.4,-5.9,53.9,98.80000000000001), null);


(lib.legshoe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(11.5641,2.9297,0.9999,0.9999,-6.2726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(15.2913,35.4654,0.9999,0.9999,-6.2726);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(11.5641,2.9297,0.9999,0.9999,-6.2726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(15.2913,35.4654,0.9999,0.9999,-6.2726);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#77422C").s().p("AjhB0QgfgFgWgPIgIgGIgEgCIgBgCQHoAVBajgQADAMACAOIAAAUQgBAdgLAeQgKAZgSAUQgUAWgZAIIgSAJQgUAHggAGQiAAXiWAJIgsABQgYAAgQgCg");
	this.shape_4.setTransform(33.6625,85.7266);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#813E0C").s().p("AkKCcQgSgLgLgTQgNgSgCgXQgDgXAJgWQAIgUAMgOQANgPAEgBQAHgJAGgGQAIgFAgACQCHAGB1gTQB1gTgogyQgqgyA/ADQA9AEAkAQQAkAQAWAeQANAUAIAYQhTDNmgAAQgnAAgogCg");
	this.shape_5.setTransform(31.1875,78.7241);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legshoe, new cjs.Rectangle(-2.4,-6,65.3,103.6), null);


(lib.Tshirt = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF6600").ss(4,1,1).p("AjonPQgLBHgPBfQhBGvhLF9QgJgBgKgBQgDgBgDAAIgCAAAHPnLQADgTAFgTIg0gfQhnI4g3HoAEFIRIAjAAQAjAAACAAIANAAQAgnoBTnnAm0H/IgigEQBsn4A/nx");
	this.shape.setTransform(87.95,201.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(4,1,1).p("AjAi4QgEABgEABQgEABgEABQgbAHgQAIQgBABgCABQgNAGgGAIQgDADgBAEQgOAOgKARQgEAIgEAJQgHARgDAUQgHAxAWAoQABADACACIAAAAQACAEADADQAUAeAeANQAPAGAQADQAzAHArgiQANgMAKgMQAEgGAEgHQANgZAFgdQADgXgCgTQgEghgTgcQgNgUgSgNQgLgIgOgFQgEgCgFgBQgIgDgJgBQgCAAgCAAAhUA1QADACACADQAbAbArAHQAQACAQgCIAKgBIANgEABIBKQADASAGARQAGAMAIALQAdAtA0AHQAzAHArgiQAqgkAIg5QABgMAAgLQAAgTgEgRQgGgWgOgUQgegug0gHQgqgGgjAWQgIAFgHAHQgeAagOAk");
	this.shape_1.setTransform(88.2155,142.784);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AE+HqIgEgBIgHgGQgIgKAGgLQAGgLAMgBQAAABAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAJAAAFAIQAFAGgCAJQgCALgHADQgEACgHAAIgCAAIgCAAgAmtHUIgEgCIgHgGQgIgJAGgLQAGgKAMgBQAAAAAAAAQAAAAABAAQAAAAAAAAQABABAAgBQAJABAFAHQAFAHgCAJQgCAJgHAEQgEACgHAAIgCABIgCgBgAGZnFQgEgFgBgDIAAgEQABgEAEgIIAHgIQADgCAIgCIAAABQAEgBAEACIABAAIAGAGIADAEIAAAHIAAABIAAAFQABADgBACIgIALIgIACIgQABQAAgEgEgEg");
	this.shape_2.setTransform(88.1298,202.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AAAAAIAAAAIABAAIAAAAg");
	this.shape_3.setTransform(155.625,114);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF3333").s().p("AC4CoIgGgCIgCAAIgMgDQgJgEAAgFIAAgCQgDgEAAgFQgBgKAMgHQAGgEAIAAQADgBAHAAIATADIAHgBIAFABQAGAAAKgEIALgEIACAAQACgCAFAAQADAAACADIABADIABABQAEADgFAHQgEAJgHAGQABAEgCADQgCAHgIADIgLAFQgLADgKAAIgGAAQgIAAgIgDgAj4hqIgDgCQgDgBgCgCQgGgFAAgMQgBgFAEgEQgBgIAFgEQACgEAGgDIADgCQANgGARgEIACAAIAGgBIAMgBIAKACIASACIAJAEQAKACAKAEQAGADADAEQAGAFgEANIADAAQAFAAABAEIADABIAAADIAAAAIgBAJIgBACIgBAAQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAABQgDADgFADIgJABQgEAAgJgDIgZgGQgLgDgJADQgGABgJAGIgJACIgFABIgJABQgJAAgIgFg");
	this.shape_4.setTransform(88.4608,143.0938);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("ACwC4Qg0gHgdgtQgIgLgGgMQgGgRgDgSIgFAEQgIAEgIADIgFACIgNAEIgKABQgPACgQgDQgqgGgcgcIgEgEIAHgMQAOgaAEgdQADgXgCgTIADgCIAIgDIARgFQAVgEAVADQAqAGAbAbIAAABIgCAMQgCALAAAKQAOgkAegaQAHgHAIgFQAjgWAqAGQA0AHAeAuQAOAUAGAWQAEARAAATIgBAXQgIA5gqAkQgkAcgpAAIgRgBgAC0B9QgIAAgHAEQgMAHABAKQABAFACAEIAAACQAAAFAKAEIAMADIABAAIAGACQALAFALgCQALAAAKgDIAMgFQAIgDACgHQABgDAAgEQAHgGAEgJQAFgHgEgDIgCgBIAAgDQgCgDgEAAQgFAAgCACIgCAAIgLAEQgJAEgGAAIgGgBIgGABIgTgDIgDAAIgHABgAjXBgQgQgDgPgGQgegNgUgeIgFgHIAAAAIgDgFQgWgoAHgxQADgUAHgRIAIgRQAKgRAOgOQABgEADgDQAGgIANgGIADgCQAQgIAbgHIAIgCIAIgCIAEACIAIAEIAEAAQAJABAIADIAJADQAOAFALAIQASANANAUQATAcAEAhQACATgDAXQgFAdgNAZIgIANIgXAYQgjAcgpAAIgSgBgAjMimIgFABIgCAAQgRAEgOAGIgDACQgFADgDAEQgEAEAAAIQgDAEAAAFQAAAMAHAFQACACADABIACACQAJAFAIAAIAJgBIAFgBIAKgCQAIgGAHgBQAIgDAMADIAZAGQAIADAFAAIAIgBQAGgDACgDQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAAAIABAAIABgCIABgJIgBAAIABgDIgDgBQgCgEgEAAIgDAAQADgNgFgFQgEgEgGgDQgKgEgJgCIgKgEIgRgCIgLgCg");
	this.shape_5.setTransform(88.2155,142.784);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF6600").s().p("AFNKUIglgBIgiAAIgBAAQA3noBmo4IA1AeIgIAnIAAgCIgBgGIgCgFIgHgFQgEgCgEABIAAgCIgJADQgEgDgDACIAAgCQgJACgDADIgGAIQgEAHgBAEIAAAEQAAAEAEAEQAFAFAAADIAQgBIAAABIAUgCIAEAAIAGgJQhTHoggHogAEzJaQgGALAIAKIAHAGIADABQABABABAAQAAAAABAAQAAAAABAAQAAAAABgBQAHAAAEgBQAHgEACgKQACgJgFgGQgGgIgIAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQgMABgGAKgAmhKEIgGgBIgCAAIgEgBIgHgBIgigDQBsn4A/nxIAFgiQATAYAYAMQAKALAJASIgaCmQhBGuhLF+IgTgCgAm4JFQgGAKAIAKIAHAGIADACQABAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAHAAAEgCQAHgEACgKQACgJgGgHQgEgHgJAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQgMABgGALgAj7qTQASAagHAGQgIAGgBABIgCACQgEgKAEgfgAjUp8IAPgBIgIACgAj7qTQAWAGAYAHIgJABIgHABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABIgDAAIgFADIgBADg");
	this.shape_6.setTransform(87.95,188.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCCC66").s().p("AA5K1IgggGQgcgGg6gHIk0gmQBLl+BBmuIAaimQAOgSAOAAIAFAAIABAAQAzAIArgjIAXgYIAEAFQAcAbApAHQASACAQgCIAKgBIAMgEIAFgCQAJgDAHgEIAGgEQACASAHARQAGAMAIALQAdAtA0AHQAyAHArgiQAqgkAIg5IACgXQAAgTgFgRIAUALIAQAHIAPAHIAUALIAcAPQhmI4g4HpIgqABQggABgZAGQgZAGgkAPQgdANgKACQgHABgKAAIgQgBgAA1IDIACAAIgCgBgAGxKoIAAgBIgCAAIgBAAIgGAAIAAgBIgFgBIgBAAIgFgDIgCAAIgBgBIgFgEIgDgDIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIAAAAIgBgBIAAAAIAAAAIgBgCIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIgBAAIAAgBIgTAAQAgnpBSnnIACgDQABgCAAgDIAAgFIAHgmQAJACAMAHIA9AjQASALAPALQAJAEAGAHIAIAHQAXAVAWAiQANATAYAsIAqBOIABABQAEAFADAKQASAmANAhIADAEQAHAIAGAOIAKAaQAEANALAUQANAYgFALIgCADQgBAMgOAHQgIAFgQACQhNANgvgEIgJgBQgLACgWAAIgugCIgSgEIgWgIIgOgDQgSgEgMgJIgCgBIgBAEQgPBAAAAeQAAAOACAUIAEAjQADAvgGBXIgEBIIAAAIIAAAOIAAABIAAAAIAAABIABABIAAABIAAAAIAAABIABABIAAABIAAAAIAAABIAAABIABABIAAAAIAAABIAAABIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAADIABABIAAAAIAAABIAAABIAAABIAAABIACANIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIABABIAAABIAAAAIAAABIAAABIABACIAAABIABABIAAABIAAABIABACIAAAAIAAABIAAABIABABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAACIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIAAAAIAAABIgBABIAAABIAAAAIgBABIAAABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIAAAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIAAAAIAAABIgBABIAAABIAAAAIgBABIAAABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIgBAAIgDADIgFAEIgBABIgBABIgGACIgHACIgGACIgiAAgALzAqIABgBIgBgBIAAACgAolJtQgTABgLgCQgQgDgHgLIgDgFIgCgKIABgGIgBgFQgFgRAFgSQACgIAEgHQgEgKgBgMQAAgOAEgXQAOhYAiiUQAoisAMg/QAJgwAKgXIADgFIACgTQgTABgfgEQg2gHgigLQgigLgfgRQgSgFgRgJQgdgQgcgfQgSgUgdgnQgWgegFgTQgLgrAkg6IAGgJQAVgfAcgcQAIgQAPgRQAUgYAtgtQATgTAKgIIAngcIAZgSQAPgKAMgFQAPgGAPgBIADgBQAXgLApgBQBogFBWAQIARAEIAhAIQgEAfAEAKQgNAGgGAIQgDADgBAEQgPAOgJARIgJARQgJAUgDAYQgHAxAWApIACAFIABAAIAEAHIADAEIgFAjQg/HyhsH3QhHgHglABgABwnmIACgMIAAgBQgagbgrgGQgWgDgUAEIgQAFIgJADIgEACQgDghgTgbQgSgcgbgOQgMgIgNgFQAVAGAQABQAOABAHADIABABIACAAQAIACAKAMIAcAeQAMANALADQAHADAOAAIBOAAIALABQAGABADACIABAAIALAJQAFADAMADIAKADQgIAFgIAHQgeAagNAlQAAgLABgLgAiQqDIgEAAIgJgEIAJAAIABAAIATAIQgIgDgIgBg");
	this.shape_7.setTransform(85.0567,189.2613);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF9966").s().p("AAAABIAAgBIAAABIAAAAIAAAAgAABAAIAAAAIgBAAIAAAAIABAAg");
	this.shape_8.setTransform(212.9,9.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AACAyIAAAAIgBgBIABgBIAAAAIABAAIAAgBIABgCIAAABIAAABIAAABIAAACIAAAAIgCAAgAgDgxIABABIAAACIAAABIAAABIABABIAAABIAAABIgCgIg");
	this.shape_9.setTransform(212.725,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Tshirt, new cjs.Rectangle(0,0,213.1,258.7), null);


(lib.sed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AgxAgIABgBIAAgCIAAAAIAAgCIABgBIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgCIABAAIAAgCIABAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAgBIAAgBIABAAIAAgBIAAAAIAAAAIABgBIAAAAIABgBIAAAAIAAgBIABAAIAAgBIAAAAIAAAAIABgBIAAAAIAAAAIABgBIAAAAIAAgBIAAAAIAAgBIABAAIABgBIAAgBIAAAAIAAAAIABgBIAAAAIAAAAIABgBIAAAAIAAgBIACgBIAAAAIAAAAIAAgBIABAAIABgCIAAAAIABAAIAAgBIAAAAIABAAIAAgBIABgCIABAAIAAAAIABgBIAAAAIABAAIABgBIAAAAIAAAAIABAAIAAgBIACAAIAAAAIABAAIAAgBIABAAIAAAAIABAAIAAgBIABAAIAAAAIABAAIABgBIAAAAIABAAIABAAIAAgBIABAAIAAAAIADAAIAAgBIABAAIAAAAIAHAAIAAAAIADAAIAAABIACAAIAAAAIABAAIABABIACAAIAAAAIAFAAIABABIACAAIAAAAIACAAIAAABIACAAIAAAAIACAAIAAABIABAAIAAAAIAAAAIABABIABAAIAAAAIABAAIAAABIABAAIAAAAIABAAIABABIAAAAIABAAIAAAAIABABIAAAAIABAAIAAABIABAAIAAAAIAAABIABAAIAAAAIABABIAAAAIABAAIAAABIABAAIABAAIAAABIABAAIAAAAIAAAAIABABIAAAAIAAAAIABAAIAAABIAAAAIAAAAIAAABIgBAAIAAAAIgCAAIAAABIgCAAIAAAAIgBAAIgBABIgBAAIAAAAIgBAAIgBABIAAAAIgBAAIgBAAIgBABIgBAAIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAABIAAAAIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAABIgBAAIgBAAIAAAAIgBABIAAAAIgBAAIAAAAIgBABIAAAAIAAAAIgBABIAAAAIgBAAIgBABIAAAAIgBAAIgBABIAAAAIgBAAIgBAAIAAABIgBAAIAAAAIgBAAIAAABIgBAAIgBAAIgBAAIAAABIgCAAIgBAAIgBAAIAAABIgBAAIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAABIgBAAIAAAAIAAAAIgBAAIAAAAIgBAAIAAABIgBAAIAAAAIgBABIAAAAIgBAAIAAABIgBAAIAAAAIgBABIAAAAIgBAAIgBABIAAAAIgBAAIAAABIgBAAIAAAAIgBAAIAAABIgBAAIAAAAIgBAAIgBABIgBAAIAAAAIgBAAIgBABIAAAAIgBAAIAAAAIgBABIAAAAIAAAAIgBAAIgBACIAAAAIAAAAIgBAAIAAABIgBAAIAAABIgBAAIAAAAIAAABIgBAAIgBAAIAAAAIAAABIgBAAIAAAAIgBAAIAAABIAAAAIgBAAIAAABIgBAAIAAAAIAAAAIAAABIgBAAIAAAAIAAABIgBAAIAAAAIgBABIAAAAIAAAAIgBAAIgBABIAAAAIgBAAIAAABIAAAAIgBAAIAAAAIAAABIgBAAIAAABIAAABIgBABIAAAAIgBABIAAAAIAAAAIgBABIAAAAIAAABIgBAAIAAAAIAAABIgBAAIAAABIgBAAIAAAAIAAABIgBAAIAAABIAAAAIgBAAIAAABIAAAAIgBABIAAABIgBAAg");
	this.shape.setTransform(4.95,3.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sed, new cjs.Rectangle(0,0,9.9,7.5), null);


(lib.open_mouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(1,1,1,3,true).p("AGgiSIAAASIt5AAIAAh0AGgkAIEkAAQgkDJjHCXQjICYkRAJQkQAIjDiiQjCihgujGIDqAA");
	this.shape.setTransform(69.825,25.6983);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#990000").ss(2,1,1).p("AnZAAIN5AAIA7AA");
	this.shape_1.setTransform(69.9,1.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Am8A6IAAhzIN5AAIAABhIAAASg");
	this.shape_2.setTransform(66.95,7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AnSBnQjDihgujGIDqAAIAAAMIAAB0IN5AAIAAgSIAAhiIAAgMIEkAAQgkDJjICXQjHCYkRAJIgbAAQj/AAi4iagAHbj0Ig7AAg");
	this.shape_3.setTransform(69.825,25.6983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.open_mouth, new cjs.Rectangle(-2,-1,143.7,53.4), null);


(lib.nose = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663300").ss(10,1,1).p("Aj0iJIHpET");
	this.shape.setTransform(24.525,13.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.nose, new cjs.Rectangle(-5,-5,59.1,37.5), null);


(lib.hat = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF6600").ss(12,1,1).p("AsfABQgEAGAAAHQAAAEACAEQAQAmCsgQQAZgDAcgDQBBgIBJgIQB8gPCSgOQAagDAagDQA6gGA8gGQEOgcDPAGQA1ABAwAEQA0AFApABQBPABAkgM");
	this.shape.setTransform(82.025,72.8508);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEAjIgEgDIgCgEIgBgBQgEgBgDgCIgEgFIgCgJIgCgJIABgJIADgIIAAgBIAAgDIABgCIACgBIAAAAIAAgBIABgCIAAgBIACgCIABgBIAFgEIABAAIACgBQAAgBABAAQAAAAABAAQAAAAABAAQABAAAAAAIABAAIABABIABABIABABIADAAIAAAAIADAAIABAAIAEABIACABIABAAIABABIABAAIABABIABABIABABIABAAQADADABADIABAKIAAALIABANQgBAHgDAFIgGAHIAAAAIAAAAIgCABIgCAAIgBABIgBAAIAAABIAAgBIAAAAIAAAAIgBABIgFACIgEAAQgDAAgCgCgAAMgJIABgBIAAAAIABAAIAAgBIgBgBIAAAAIgBADgAgUgVIAAAAIABgBIAAAAIgBABgAgKAeIABAAIAAABIgBgBg");
	this.shape_1.setTransform(147.825,50.1688);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9966").s().p("AqaCvQADg1AVgyQAlhdBUhIQAtgnAwgYQAggPAhgHQAxgNBYACQBjACAngGQAegEArgMIBIgVQCZgqB+AVQBJAJA/AgIAYAMIAAABIABAAIABACIAAAAIABABIABABIAAABIABABIABAAIABACIABAAIABABIAAABIABABIAAABIABAAIABABIABABIAAAAIAAADIABAAIABAAIAAABIABAAIAAABIAAAAIABABIAAABIABABIAAABIABAAIABAAIABACIAAACIABAAIAAABIAAABIABABIABABIAAAAIABABIABABIAAAAIAAACIABABIABAAIABABIAAABIAAABIABABIABABIABAAIABABIABABIAAACIABAAIAAABIABABIABABIAAABIABABIABAAIAAAAIABABIAAACIABABIABAAIAAABIABABIABABIAAABIABABIABAAIAAAAIABACIAAABIABABIABABIAAABIABABIABAAIAAABIAAABIABAAIABABIAAABIABABIAAABIABACIABAAIAAABIABABIAAABIABAAIABABIAAABIABABIAAABIABABIABABIABAAIAAACIABABIAAAAIABABIAAABIACABIAAABIAAABIABABIABABIABAAIAAABIABABIAAABIAAABIABABIABABIAAAAIABABIAAACIABABIAAAAIABABIABAAIAAABIABACIAAABIABAAIAAABIAAABIADAMIACANIACAMIADALIAAADIABADIABADIABADIAAADIABADIABADIABADIABADIAAADIACADIABACIABACIABACIAAABIABAAIAAABIABABIAAABIABABIAAAAIABAAIAAABIABACIAAABIABABIABABIAAABIAAABIABAAIAAABIAAABIABABIAAABIAAABIABABIAAABIAAABIAAAAIABACIAAAAIAAABIAAABIAAABIABABIAAABIAAABIABAAIAAABIABABIAAABIABAAIAAAAIAAABIABABIABABIABABIAAABIABAAIAAABIABABIAAABIAAABIABAAIAAABIABABIABABIAAABIABAAIAAABIABABIAAABIABABIABAAIAAAAIAAABIAAABIAAABIABABIAAABIAAABIAAABIAAABIABAAIAAABIAAABIABAAIABABIAAABIABABIAAABIAAABIABABIAAABIABABIAAABIABAAIABAAIAAABIAAACIABABIAAABIABAAIAAABIABABIAAABIAAABIABAAIAAABIABACIAAAAIAAABIABABIAAAAIABABIAAABIABABIAAAAIABABIAAAAIAAABIAAACIABAAIAAABIABABIAAABIABABIAAABIABABIAAAAIAAABIABABIAAABIABABIAAABIABABIAAAAIABABIAAABIAAABIAAABIgEAEIgBABIgCACIgBABIAAACIgBABIAAAAIgBABIgBACIgBADIAAABIgCAIIgBAKIABAJIADAIIAEAGQADACADABIACAAIABAFIAEADQADACAEAAIAEgBIgCAIIhSgOIgNgCIgLgBIg9gGIgMgCQgvgEgygDIgXABQhxAChEgDIgygDQgnABgoACQgrABgqAEQlLAWh1AhIhWAXIgpALQgDAEgEADIgBAAQgJAFgIgHIgLAEIgVAEQgJgpAEgrgAKLCrIAAgBIAAAAIAAABgAKBB2IAAgBIAAAAIAAABgAKaBpIgBAAIABgJIAAAAIAAAAIABACIgBACIABAAIAAABIAAABIABACIAAAAIAAABIAAABIgCgBgAKTBnIAAAAIAAgCIAAgBIAAAAIgBgCIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAgBIAAAAIAAgCIAAAAIAAgBIgBgCIAAgBIAAgBIAAgCIAAgBIAAgCIAAgCIgBgDIAAgBIAAgCIAAgBIAAABIAAAAIABAAIAAABIAAAAIAAAAIAAABIABAAIAAABIABAJIAAAHIAAAHIAAAHIABAFIgBgBg");
	this.shape_2.setTransform(81.674,36.1998);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF6600").s().p("AswBnQgTgJgBgOIAAgEQACgQAWgPQAlgaBdgXIAWgFIAKgDQAJAGAIgEIACgBQADgCADgFIAqgKIBWgYQB0ggFMgXQArgDApgBQApgDAnAAIAyACQBEAEBxgDIAWgBQAyADAvAFIANABIA9AHIALABIANABIBRAOIAJABIACABIABAAIABAAQAxAKAgAMIANABQAKADAUAIIALAEIAHAEQAFADAJAIQAMAKAFAHQAIAKgBANQAAAPgHAKIgFAFQgHAHgKADQgIACgIgBIgFgCIgEgBQgGgDgHgFIgPgNQgHgEgIgDQghAEgzAAIhdgFQgpgDgsgCQjVgIkYAdIgvAFIhIAHIg0AGQjmAYixAWIg1AGQgzAFglAAQg5AAgZgMg");
	this.shape_3.setTransform(83.7265,62.6111);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("AAvDoIgCgBIgBgEIAAgHIAAgHIAAgHIgBgJIAAgBIgBAAIAAgBIAAgBIAAAAIAAAAIgBAAIAAAAIAAgBIAAABIAAACIAAABIABADIAAACIAAACIAAABIAAACIAAABIAAABIABACIAAAAIAAABIAAABIAAABIAAABIAAACIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIABACIAAAAIAAABIAAABIAAABIgBgBQgBAAAAAAQgBAAgBAAQAAABgBAAQAAAAgBAAIgCABIgBABIAAgBIAAgBIAAgBIgBgBIAAAAIgBgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAAAIgBgBIAAgBIgBgBIAAgBIgBAAIAAgCIAAgBIAAgBIgBAAIAAgBIgBgBIAAAAIgBgBIAAAAIgBgBIAAgBIAAAAIgBgCIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgCIAAgBIgBAAIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIgBgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIgBAAIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIgBgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIgBgBIAAgBIAAAAIgBgBIAAAAIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIAAAAIgBgBIgBgBIAAgBIgBgCIAAgBIgBAAIAAgBIgBgBIAAAAIgBgBIAAgBIgBAAIAAgBIgBgDIgBgCIgBgCIgCgDIAAgDIgBgDIgBgDIgBgEIgBgCIAAgDIgBgEIgBgCIgBgDIAAgEIgDgKIgCgMIgCgOIgDgLIAAgBIAAgBQgBgFgCgFIgCgMIgDgLIgBgLIgCgNIAAgMIAAgNIAAgNIAAgKIAAgBIAAgBIAAgBIAAgGIAAgJIAAgJIAAgJIAAgJIABgLIAAgJIgBgJIABgKIAAgGIAAgDIABgIIAAgJIABgIIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgDIAAgDIAAgDIAAgBIABgCIAAgEIABgDIAAgCIABgEIAAgDIAAgCIABgDIACgDIABgBIAAgDIABgBIAAABIAAABIgBABIAAABIAAABIAAABIAAABIAAABIAAAAIgBACIAAABIAAABIAAABIAAABIgBABIAAABIAAAAIAAABIAAACIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIAAABIAAACIAAABIAAABIAAABIAAAAIAAABIAAAAIAAABIAAACIAAACIAAACIAAACIAAACIAAABIAAADIAAAAIAAACIAAACIAAABIAAADIAAACIAAACIAAACIAAADIAAABIAAACIAAACIAAACIAAADIAAACIAAAEIAAAHIAAAFIABADIAAAIIAAAGIABAHIAAAIIAAAGIABAIIAAAHIAAAFIAAAHIAAAHIABABIACAEIABAEIACAEIABAFIAAADIABAFIABAEIABADIABAFIAAADIABADIAAAAIABABIAAAAIAAABIABABIAAAAIAAAAIAAABIAAABIABAAIAAAAIAAABIAAABIAAAAIABABIAAABIAAAAIABABIAAABIABABIABAAIAAABIABABIABABIABABIAAACIABAAIABABIABACIABAAIABABIAAABIABABIABABIABABIAAABIABACIABABIABABIABACIABACIACABIAAAAIAAAAIABABIAAAAIABABIAAABIAAAAIAAABIAAAAIABABIAAABIAAAAIAAABIABABIAAABIAAAAIABABIAAAAIABABIAAAAIAAABIABAAIABABIAAAAIABABIAAAAIABABIAAACIAAAAIABAAIAAABIAAAAIAAABIABABIAAAAIAAAAIAAABIABAAIAAABIAAABIAAAAIAAABIABAAIAAACIAAAAIAAABIABABIAAAAIABABIAAAAIABAAIAAAAIABABIAAABIABABIAAAAIABABIAAAAIAAABIABABIAAAAIAAABIAAABIABAAIAAABIAAAAIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIABABIAAAAIAAABIABAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABAAIAAABIAAABIAAABIAAABIABABIAAAAIAAABIAAAAIABABIAAABIAAAAIAAAAIABABIAAAAIAAABIABABIAAABIAAAAIABACIAAAAIAAABIAAABIAAAAIABABIAAAAIAAABIAAAAIAAABIABABIAAABIAAAAIAAACIAAAAIABABIAAABIAAABIABABIAAABIABABIAAABIABABIAAABIABACIAAABIAAABIAAADIABACIAAACIAAACIABABIAAABIABABIAAACIAAACIABABIAAABIAAABIAAABIAAABIABADIAAABIAAABIAAACIABABIAEANIADAMIABAMIAAANIAAAMIAAAOIAAAMIAAAIIAAABIAAACIAAABIAAAAIgBAJIgDABIAAgCg");
	this.shape_4.setTransform(143.175,23.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hat, new cjs.Rectangle(-4.3,0,172.70000000000002,83.7), null);


(lib.hair = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AIXHJQgEgCACgIIADgLQACgFADgBQAVhegHhtIgaADQglAFhLADIgQABQgyACgdgBQg1AAgqgGQg7gIhnggQhCgVgqgQQg7gWgtgaQhJgrgtg3QgQgSgNgUIAAABQgCABgEAAIgTABIhmAaIgfAJIgOAFQgZAJgRANQgjAcgYBDQggBagLASQgYAqgqAbQgXAOgYAIQgVAHgXABQgaADgPgKIgCgBQgYgTAGg5IANh+QAGg4AEgbIAGgkIAKgtIAKghQAXhEAqg8QA0hLBIg1QAqgeBcgwQBAgiAkgJQAkgKBGgCQBRgCA5ADQBLADA9AMQCYAcBkBPQAYATAeAeIA0A1IATATQAzAyBBA4IAtAnIBfBOIAAABQAiAbAQALIAJAGQAZAPAXAGIAcAGIAMACIAOADIAAgBIAAAAIACAAIABgBIABAAIABAAIABAAIABgBIABAAIABgBIABgBIABgBIAAAAIABgBIAAAAIAAABIAAABIgBAAIgBACIAAABIgBAAIAAABIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAABIgBACIgBACIAAAAIgCAEIgCACIAAABIgCADIgCADIgBAAIgBADIgDACIgDAGIgDADIgBABIgBABIgCACIAAAAIgDAEIgEADIAAABIgCABIgCABQgCAFgGADIgFADQgTAQgTAFIgWALQgwAVgzAOQACAEAAAGIgCAKQAFAlgSA0IgRAtQgLAbgFASIAAABQgDAMgIAOIgHAJQgCADgJAEIgFACIgCgBg");
	this.shape.setTransform(83.015,45.7635);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hair, new cjs.Rectangle(0,0,166.1,91.6), null);


(lib.face_clean = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF99CC").s().p("AhsARQgMhDA6gmQAUgOAXAHQBWAagUBTQgFAUgUAGQhTAXAHhTQACgXAWgHQARACALAPQALAQgEASIgBADIgDAEIgCAEIgCABQgFADgEABIgLABIgBgCQAAgDAFgBIAKgDIAEgDQAGgLgEgMIgDgFQgGgLgOgHIgDgBQgSAIgBAUQgBATAHARIABACQA9AjAUhBQAHgUgNgTQgohAg+AoQgRAMgIATQggBRBSAfQAeAMAegLQApgQAXgsQAWgqgIgqIADgCIAEABIADADQASA2ggAuQgfAsguARQgQADgPAAQhNAAgOhRg");
	this.shape.setTransform(84.3993,46.8293);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("Ah/IGQhygChIgXQhmghg0hIQgrg6gPhmIgCgNQgDgWgFg5QgLgKgLgQQgng0gZgkQgbgmgOgaQgUgmgHgiIgGgkIgFgqQgFgpAAgUQgBgiAJgaQAIgXAOgIQAOgIARAIQANAGAFAMQAFAGAGALIAGALQADgIAEgEQAOgOAUAGQASAGAHATQADgPAPgHQAPgIAOAHQAOAGAOAdQAPgKATAHQATAIAFARIAAAAQAKgCALADIACgCIAEgEQALgLAZAFIAHACIAEgHQADgEAGgEIAKgGQAJgFAPgNQAQgKAMAGQgCgLAGgKQAFgKAKgFQAKgFAMACQALACAIAIQAGAGAGARQAHAQAGAGQAAgJAJgGQAIgGALgBIAUAAQANAAAGgBIARgGQAJgDAGAAQA2goAmgiQA/g5Arg7IA6ALIAmAwQALgCAKAGQAIAEANAMQAJAHAWAFQAoAJAnABQArADAIACQAeAGAOAUQAEAGAEAKIAHASQAHATAVAiQAhA1AXAVIATASIADACQArgiAUgtIARgqIADgIQAJAWAGAVQAJAfAJAwQAHApABAVQAJBxgyBsQgfBEgxA8IAAASIAACYIgBABIgCAAQgIACgKAMIgcAeQgNANgLADQgHADgOAAIhOAAQgNAAgHAEIgIgNQgLgUgJgXQhZAxiCArQhkAfg7AIQgqAFg1AAIgSAAgACeiKQg6AmAMBEQARBgBqgTQAugRAfgrQAggvgSg2IgDgDIgEgBIgDACQAIAqgWArQgXArgpAQQgfALgegMQhSgeAghSQAIgTARgMQA+goApBAQANATgHAUQgUBBg+giIgBgCQgHgRABgUQABgUASgIIADABQAOAHAGALIADAFQAFAMgHAMIgEADIgKADQgFABAAADIABACIALgBQAEgBAFgDIACgBIADgEIADgEIABgDQAEgTgMgQQgLgPgRgCQgWAHgCAXQgHBTBUgWQAUgGAFgUQAUhUhXgaQgIgCgIAAQgOAAgNAJg");
	this.shape_1.setTransform(62.2923,51.8321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.face_clean, new cjs.Rectangle(-8.3,0,141.3,103.7), null);


(lib.open_eye = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("ABdAAQAAA3gbAnQgbAngnAAQgmAAgbgnQgbgnAAg3QAAgiALgdQAHgQAJgOQAbgnAmAAQAnAAAbAnQAJAOAGAQQAMAdAAAig");
	this.shape.setTransform(9.25,13.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAAANIgDAAIgEgCQgEgCgCgFQgBgEABgDQABgEAEgCQAEgDAEAAIAAgBQAGACADACQAEADABAFQABAEgDADQgDAFgGACIgDABIAAgBg");
	this.shape_1.setTransform(6.5518,20.0083);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhABdQgcgmAAg3QAAgiALgcQAHgRAKgOQAbgnAlAAQAnAAAbAnQAJAOAGARQAMAcAAAiQAAA3gbAmQgbAngnAAQglAAgbgngAgjA5QgDADgBAEQgCAEACAEQACAFADABIAEADIADAAIAEAAQAGgCAEgFQACgEgBgFQgBgEgEgDQgCgCgIgCIAAABIgBAAQgDAAgEACg");
	this.shape_2.setTransform(9.25,13.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.open_eye, new cjs.Rectangle(-1,-1,20.5,28.5), null);


(lib.close_blink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("ABdgRQgBAzgaAmQgbAngnAAQglAAgbgnQgbgmAAg2QAAg1AYgl");
	this.shape.setTransform(20.15,15.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFB684").ss(0.1,1,1).p("ABQA4IAAAAABQA4Qgnich5BAQAdAqArAXQAmAVAyAGg");
	this.shape_1.setTransform(21.35,8.5359);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAAANIgDAAIgEgCQgEgCgCgFQgBgEABgDQABgEAEgCQAEgDAEAAIAAgBQAGACADACQAEADABAFQABAEgDADQgDAFgGACIgDABIAAgBg");
	this.shape_2.setTransform(17.4518,20.5583);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFBD7B").s().p("AgHAdQgrgXgdgqQB5hAAmCcQgygGglgVg");
	this.shape_3.setTransform(21.325,8.5359);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhBBIQgbgnAAg2QAAg0AZglQAdAqAqAYQAmAVAyAGIABAAQgBAzgaAmQgbAngnAAQgmAAgbgngAgjAkQgEACAAAEQgCAFACADQACAFADACIAEACIADAAIAEAAQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgDgIgCIAAABIgBAAQgDAAgEADg");
	this.shape_4.setTransform(20.15,15.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFB684").ss(0.1,1,1).p("ABQAtIAAAAABQAtQgnich5BBQASBdAqAOQAqAPA6gfg");
	this.shape_5.setTransform(21.35,9.5557);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFBD7B").s().p("AgTA9QgrgOgRhdQB5hBAmCcQgnAVggAAQgPAAgNgFg");
	this.shape_6.setTransform(21.325,9.5557);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhBBIQgbgnAAg2QAAg0AZglQARBeAqAOQAqAOA6gdIABAAQgBAzgaAmQgbAngnAAQgmAAgbgngAgjAkQgEACAAAEQgCAFACADQACAFADACIAEACIADAAIAEAAQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgDgIgCIAAABIgBAAQgDAAgEADg");
	this.shape_7.setTransform(20.15,15.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFB684").ss(0.1,1,1).p("ABQALIAAAAABQALQgnich5BAQAIC0AsABQArACBBhbg");
	this.shape_8.setTransform(21.35,13.0251);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFBD7B").s().p("AgcBlQgsgCgHi0QB5hAAmCcQhABagqAAIgCAAg");
	this.shape_9.setTransform(21.325,13.0251);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhBBIQgbgnAAg2QAAg0AZglQAHCzAsACQArACBBhaIABAAQgBAzgaAmQgbAngnAAQgmAAgbgng");
	this.shape_10.setTransform(20.15,15.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFBD7B").ss(0.1,1,1).p("ABdgRQgBAzgaAmQgbAngnAAQglAAgbgnQgbgmAAg2QAAg1AYgl");
	this.shape_11.setTransform(20.15,15.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFBD7B").s().p("AhBBRQgbgmAAg2QAAg0AZgmQAHC0AsACIABAAIAAAAIACAAQAngCA4hLIAAAAIACgCIABgBIAGgIIABgBIABAAQgBA0gaAlQgbAngnAAQgmAAgbgngAgPBRIgBAAQgsgCgHi0QB4hAAnCdIgBABIgGAIIgBABIgCACIAAAAQg4BLgnACIgCAAIAAAAgABcgIIAAAAg");
	this.shape_12.setTransform(20.15,15.0109);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},7).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_5},{t:this.shape}]},6).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape}]},6).to({state:[{t:this.shape_12},{t:this.shape_8},{t:this.shape_11}]},5).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape}]},4).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.9,2,20.5,26.1);


(lib.drape = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#993333").s().p("EhbWA98QhhgShCgbQhVgjg1g3QhBhEgfhwQgVhNgLiFQgelxgIm9QgGlEAFnsQAGnwAWvcQAMoJADkVQAEm6gIlkQgWpugIk3QgOojAamBQARjuAoidQAYhhAlhSQgNgjAHgvQAOhYBGgwQA7goBagLQA7gIBpAFIUHAzQAzACAeAJQAsANATAeQBMg4B1gLQBNgICIAMIUhBuQAzg6BfgXQA/gPBwgCQG0gLDuADQECADClAbQDlAnCjBhQBAhKB5gYQBSgRCNAEIRuAeQAyACAaADQApAGAeAQQAUAKARAOQATgSAagOQAngXA8gSQCQgtC9gOQBzgIDiAAINDACQA6AAAfAFQAyAIAgAYQAJAGAIAJIAQgKQBLguBWgYQBWgZBYgBQBSgBBzAWQBBAMCBAbQDqArEFgUQCxgOAuACQB+ADBUAvQAeARAXAWIADgCQA4gvBLgYQBAgVBSgIQA1gFBhgBIMZgOQCHgDBLANQByATBHA7QBFA6AlBpQAbBLAPB6QAsFPAAGWQAAEigaHHQgjJugEB8QgQGnASFDQAHCKA6I/QAsG2gFEUQgEC2gZD3QgOCPgiEdQg5IQAjFFQANB5AlDxQAaDUgUCUQgSCHg6BuQhCB5hnBCQhIAthmAYQhIARh0AKQnFAonIgpQg4gFgogcQgvggAQgpQAEgIANgSQAMgQADgLQAEgQgNgNIgDgDQAPAGAIAZQAMAlgMAmQDkgCDmgKQgVgwgEhIQgDg9AJhwQAJh3gBg1QgChfggizQghi5gDhZQgDhaAUiqQAUixgBhTQgCjHhYhwQCBBcALDzQADBTgKCoQgJCmAEBUQADBMAsEVQAjDZgPCHQgHA+gVB9QgHBAAHAzQECgMECgVQBcgIAzgLQBNgQA3ghQBVg0A0hnQAthaAOh0QAQiOgcjLQgmjlgOhzQgnlLA3oWQAgkhAOiRQAZj6ACi4QADkPgum3Qg6oigJijQgRk9ATm6QAcn7AMj9QAirggmqRQgFhXgLgwQgRhKgmgvQg8hKh4gVQhAgLhyACIA2A/QA+BKAmBCQAuBQAVBQQAWBZgMBRQgTCIg8DkQhFEHgTBjQhWG+CcEYQArBMAQAsQAaBGgFA7QgIBlgiBiQgiBhg4BVQAfjEgBhtQgBiqhBh2QhMiJgYitQgViaAUivQARiOAvizQARhBBLj7QAqiOAJhiQALiGgshlQg9iMhOiDIgVABQhtAFjPABQjYAChkAEQkTAJjSArIAEAQQAHAugWA7IgvBlQgDgSgBhEQgBg1gOgeQgIgQgMgOIgmALQAGgRAIgPQgLgIgNgHQhAgkhfgDQgsgCh+AKQlGAbkwg9QhygZg5gKQhigShKADQh3AFiCA5IgeAOQAHAcADAgQAKBjggBiQggBhhDBKQAChzgCg6QgChHgIg8IgDAGQgQAtAFAtQgihwAWhJIgFgFQgKgIgSgDQgKgCgVAAItigCQiSAAhlAEQgpDAgQBrQgfDSAMCqQAYFphwEaQg/CggNCXQgPCqA0CNQBgEHAhCTQA0DpghC7QgwjRhJkCQgsidhdkxQgwifBEjoQAKgjA1iaQAnhzAPhLQAYhzACjCQADjtAIhKQAWjiBijlQgvADglADQjCAQiTAzQghALgZANQASBJgSBSQgMA2gqBoQgpBngMA3IgznpIzkgmQh8gEhRAbQhtAkgXBWQgHAZAAAwQgBAygEAWQgIAmgeAZQggAbgggNQgpgRAGhDQANhRgBgkQgEhMhSgwQhCgmhjgOQkKgllPgFQjNgEmQALQgwABgaAFQgoAIgZAWQgsAlgBBRQgBAuAJBgQAAAigKAZQgNAegZAKQgqAPggguQgdgrACg1QAFhSgCgSQgFg4gjgYQnSgpjQgQQl5gfkrgQQi1gLgpBZIgSA5QgKAigTAOQgZATgjgNQghgNgPgfQgNgaAAglQgBgWAGgsI1Lg0Qg+gCggACQg0ADgnAQQguASgeAlIgLARIgLBCIAsgUIgvAiQgaCzgIDQQgHDGAKGeQAOH7ATP0QAJILACD1QADGqgJFUQgGC+gYIIQgVG/gEEHQgEFsARHFQAKEYAeIZQAEBUAJAtQAOBGAhAvQAvBCBiAlIAYgCIA5gFQgghSALh4QAEgnANhNQANhPAEgmQAMhzgTiUQgHg8gjjKQgaiTgHhiQgJiHAShuQALg8AdhlQAih0AJgrQAtjFg7iAQAxBAAPBeQAMBQgOBfQgHAzgbB4QgZBtgGA/QgLBnARCDQAKBHAgCiQAjCpALBjQAQCWgPB4QgIBGgmCXQgdB2gKBKQERgVEUANQAfACALAKQAHAGACAIQBkgIBBABQB5ABBjAcQBuACBPgWQA0gOAogbQAtgeAYgpQAUgjAMg/QAQhRAHgUQAGAnAWBNQARBGgMAuQgQA/hFA3QhFA3hWAYQhKAVhkAAQgjgBiPgJIg7gDQiDAliKARQhwAOhuAAQihAAifgdgEAxtA5JQAAgXADhWQAGiPgQh1QgUiJgyhvQg1h2ASikQAHhAAUhNQAMgyAbhYQAIA3AABOIgBCGQABCiAqBeQCGEsg3DsQgJAngaBKQgZBLgJAmQgNgugBg9gEBWpAoyQiEl6gXhQQhNkEgMjYQgQkFBOjSQBjkNAfiaQAxjwgwi9QhomXA6leQAvkfgckjQAiAkATA4QAPArAIA/QARCDgHClQgFBjgUDEQgMB4AWCPQARBpAqCbQApCSgWC1QgQCIg6C9IhhE+QgxC3gDCOQgECjA3DLQAZBeBcEKQBODgAbCGQAnDGgbClQgli4hgkWgEhY/ALBQgqjqhllLQhCjTBWksQAXhQA8inQA6igAYhWQBHj+ARm6IAOlhQALjJAYiWQA3lTgVk7QgXlXhwknQCJDbAwEqQAnD0gSE7QgKC5gmFyQgdFMAPDfQAPDdhMEKQgxCth8EmQhLCyAdDzQARCNBQEiQBJEGAICtQALDzhlCoQAZkIg3k5gEBLrABHQgXjNAskSQA7k6ASidQAfkPgwjFQgsi4AGjKQAFi+AxjEQAJgmBolnQBFjxAXihQAejegkjBQgojbh7iXQCKB8A+DKQA4C0gNDRQgKClg4DbQggB+hID8Qg7DcgQClQgUDUAqCuQA0DSgVEXQgKB9g5FvQguEtACDCQADESBbDMQiJiogekEgEA6BgLpQgNjxBMjlQAyibgBilQgBilg1iaQhSjuBflXQAXhVBEjEQA/izAZhmQBVlYhnjsQBMB+ATCiQARCVghCfQgVBng2CZQhNDegKAfQgtCQgLB2QgOCQAjB3QA5DDALCYQAPDAg1CZQhIDPACEQQABC2AqEzQhnjTgOj3gEAlXgKbQAYi7ALhdQASikgNh3QgQiahEhtQhSiCgdiLQggiYAoiFQAzisAJjkQAFh8gKkfQgKkKAJiPQAPjgA9irQgkC3gBDxQgBBvAPE/QAMEOgHCeQgLDpg3C5QgiBxBCCXQARApArBRQAqBPASArQBaDbgmE7QgMBogiCjQgtDcgIAtQgTh1APiigAkw4fQgLidgElDQgDkFAGiGQAJjbAjisQANg+AoieQAkiLAOhSQArkJhTizQBDBQAaByQAXBmgLB2QgIBYgeB/IgzDVQgqDGgKDzQgHCxAJEOIAQHAQAGEAgRC/QgxjPgRkLgEhLogbQQg5imAPiTQAKhkAlh6QAWhJA1iOQA0iLAXhMQAkh5AKhlQAMh4gYhsQgbh2hEhVQBPBIAqBwQAnBmABB2QABBmgaB3QgTBYgpCAIhFDVQglB7gNBfQgQB1AxDIIAmCfQATBaABBGQhhiggtiCgEghFgfSQgIi0ApisQAPg8BAjGQA0igANhmQAMhWgEhyQgCgogMigQgFhFgMgmQgEgNgGgLQgSgngggSQAjANAZAnQATAdAPAvQAoB8AJCDQAKCDgVCBQgPBbgyCkQg0CvgPBQQgaCGgDC/QgCBuACDaQg5iogIiygEg+mgecQgDiXgNh3QgQifgFhsQgGiSAKh6QANiSAmhjQAyiBBchLQhABZgdCAQgXBigFCNQgJEUArEFQAVCDgUCMQgTCEg3CBQABi1gBhagEAyWgieQAPjHgdicQgii9gHiHQgKixAgiRQANg5AdhaQAlhyAJghQAXhTAFhEQAIhSgRhFQAiBYADBfQADBggbBaQg/DQgPCqQgUDQAxCrQA4DJgYDbQgXDUheDDQAmjsAJh4gEheNg59QgFgSgBgLIADAIIAFAcg");
	this.shape.setTransform(590.824,416.39);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-25.45,27.3,0.4763,0.4763);

	this.instance_1 = new lib.CachedBmp_10();
	this.instance_1.setTransform(251.25,713.3,0.4763,0.4763);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drape, new cjs.Rectangle(-40.9,17.1,1263.5,798.6), null);


(lib.bottonreplay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AicMUQAoglA1g7QBdhnBBhdQBNhvAthsQAvhzANh1QAOh8gahxQgXhkg3hfQg0hZhLhPQh/iFjTh0QAZAjAPApQgigcgLgSQgUghAOgdQATgnBSAFQgcABgZANQgZAMgQAWQDcB4CDCKQBPBSA1BdQA5BjAWBnQAcCBgXCMQgWCEg+B/Qg4BzhaByQhLBhhrBqQgmAlgZATQgkAdgjAOQAzgiA2gyg");
	this.shape.setTransform(508.01,134.3914);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer_1
	this.text = new cjs.Text("Replay ", "96px 'Tempus Sans ITC'");
	this.text.lineHeight = 127;
	this.text.lineWidth = 428;
	this.text.parent = this;
	this.text.setTransform(165.15,57.75,1.2275,1.2275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#996633").ss(1,1,1).p("EghEgMLQAUgXAWgWQEUkTGFAAMAp4AAAQFXAQCcBgQgFALAQAZEAgqgJxQB5DQAAECIAAE/QAAE1isDsEggpgJ+Qh5DQAAECIAAE/QAAE1CsDsAQURMMgmVAAAQmFAAkUkTQhNhOg4hW");
	this.shape_1.setTransform(330.875,128.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("ALvUaQFMAMFLgJQEQgID/htQEAhtDBi/QBohlCejVQCqjkBWhbQBahgCIhbQBQg1CchYQjehXjaifQjAiMjFjKQimiyhYhTQiWiQiJhJQiyhfj7gfQifgUkqAAIpwgDIJMgIQEtgDCcARQD9AcC1BaQCvBWDGDDQAxAwB1B6QBoBuA+A6QE0ElGFCyIAPgJIgOAKIAIADIgJgDIkDCnQiqBvjEEEQhpCPg2BGQheB7hOBPQjBDEkFByQkDBxkWAMQhzAEhyAAQjdAAjfgRgA2PUJQkWgMkDhwQkFhyjBjFQhOhPheh6Qg2hHhpiPQjEkEiqhuIkDinIgJADIAIgEIgOgJIAPAJQGFizE0kkQA+g7BohuQB1h6AxgwQDGjCCvhXQC1haD9gbQCcgREtACIJMAIIpwADQkqAAifAUQj7AgiyBfQiJBJiWCPQhYBUimCxQjFDLjACLQjaCfjeBXQCcBZBQA1QCIBbBaBfQBWBbCqDlQCeDUBoBmQDBC/EABtQD/BtEQAHQFLAJFMgMQjfASjdAAQhyAAhzgFgAPHQqMgmVAAAQmGAAkTkUQhOhNg3hWIgigsIgxhAQh4icglgoQi+jRkDhwQgggNgQgMQgYgSgCgYQgFgsBJgmICvhcQBig2BDg1QBZhGB9iTIA6hEQBkhzAwgsIAagYQAUgXAWgWQETkTGGAAMAp4AAAQFWAQCdBgQgCADAAADQAAALANATQgNgTAAgLQAAgDACgDQgogaBpA2QBWAsBPA4IAKAHQBFAyA/A8QAwAsBkBzIA6BEQB9CTBZBGQBDA1BiA2ICvBcQBJAmgFAsQgCAYgYASQgQALggAOQkDBwi+DRQglAoh4CcIgxBAQh7ChhjBRIgJAHIgKAIQi8CPkVAxQh5AViPADIg9ABQhMAAhagEgEAhWAB+QAAE0itDtQCtjtAAk0IAAlAQAAkCh5jQQB5DQAAECgEgjwABxQAAE0CtDtQitjtAAk0IAAlAQAAkCB5jQQh5DQAAECIAAFAgAlSz3QgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQABAAAAAAQAAgBABAAQAAAAABAAQABAAABAAQAAAAABAAQAAAAAAABQAAABAAABQABAAAAABQAAAAgBABQAAAAAAAAQgBABgBAAg");
	this.shape_2.setTransform(338.625,132.348);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.text}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,693.2,789.3);


(lib.botton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("", "96px 'TempusSansITC'");
	this.text.lineHeight = 127;
	this.text.lineWidth = 100;
	this.text.parent = this;
	this.text.setTransform(1372.35,89.5);

	this.text_1 = new cjs.Text("Pinocchio ", "96px 'Tempus Sans ITC'");
	this.text_1.lineHeight = 127;
	this.text_1.lineWidth = 428;
	this.text_1.parent = this;
	this.text_1.setTransform(364.15,194.45,1.2275,1.2275);

	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_6();
	this.instance_1.setTransform(43.2,52.35,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_9();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_8();
	this.instance_3.setTransform(43.2,52.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.text_1},{t:this.text}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1474.4,926);


(lib.handd3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(26.2934,57.7196,0.9999,0.9999,0,9.4912,-170.5088);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(14.5222,30.9605,0.9999,0.9999,0,9.4912,-170.5088);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(26.2934,57.7196,0.9999,0.9999,0,9.4912,-170.5088);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(14.5222,30.9605,0.9999,0.9999,0,9.4912,-170.5088);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.handd3, new cjs.Rectangle(-5.9,-5.9,41,73.80000000000001), null);


(lib.handd2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AiWjCQgKAEADAMQACAOAIANIECFOQAGAIAKAGQABABAFACQAMACAGgFQAIgJgBgJQAAgJgEgGQgDgFgEgHIkClOQgKgMgKgEQgLgGgIAKg");
	this.shape.setTransform(15.8618,20.1124);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.handd2, new cjs.Rectangle(-6,-6,43.7,52.2), null);


(lib.handd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AgOmAQgUAAgPASQgOARABAXIAZKQQABAXAPARQAQAPAUAAQAVgCAOgQQAOgRgCgYIgZqPQgBgYgPgQQgPgQgUABg");
	this.shape.setTransform(27.7243,29.4985,1,1,44.9988);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AgVFyQgPgRgBgXIgZqQQgBgXAOgRQAPgSAVAAQATgBAQAQQAOAQABAYIAZKPQACAYgOARQgOAQgVACIgBAAQgUAAgPgPg");
	this.shape_1.setTransform(27.7243,29.4985,1,1,44.9988);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.handd, new cjs.Rectangle(-6,-6,67.4,71), null);


(lib.hand2L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgagQQACgBADgBQANgGAOACQANADAJAPQABAEACAEAgagQQABgBACgBQADgEAGgDQALgGALADQAMAEAGAKQADAFACAGQAAADAAAEQAAABgBADQgDALgLAGQgLAHgMgEQgLgDgIgLQgGgLADgKQACgGABgDg");
	this.shape.setTransform(9.7888,2.9554);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAXhkQAAAAAHgSQAHgSASAEQARAFARAYQADAGADAFQACACABACQAIAOADANQAFASgDATQgFAggQADQgRABgXgaQgBADgBBBQgBAxgXATQgIAHgMAEQgqAMgcgjQgGgIgFgHQgUgcgJgdQgLgmAMgsQAGgbALgUQAHgKAIgIQADgFAEgDQANgNANgFAARhxQADAFADAIAAagSQgNgHgHgNQgHgNACgQQAAgCACgEQACgIAEgHQAFgHAJgFAAygOQgHABgIgDQgEgBgFgBQAbgSgDAWg");
	this.shape_1.setTransform(11.2258,14.8422);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgHAZQgLgDgIgLQgGgLADgKIADgJIAFgCQANgGAOACQANADAJAPIADAIIgBAEQgDALgLAGQgIAEgIAAIgHgBg");
	this.shape_2.setTransform(9.7888,3.2833);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhCBuIgLgPQgUgcgJgdQgLgmAMgsQAGgbALgUQAHgKAIgIIAHgIQANgNANgFIgDAJQgEALAHALQAHAMAMADQAMADAKgHQAMgGADgLIABgDQADAFADAIIAHgSQAHgSASAEQARAFARAYIAGALIADAEQAIAOADANQAFASgDATQgFAggQADQgRABgXgaIAAgCQABgKgHgBIAAAAIgCABQgFAAgIAGIgBAAIgBABIgBABIAJACQAIADAHgBQgBADgBBBQgBAxgXATQgIAHgMAEQgKADgJAAQgeAAgVgagAAGgmQAHANANAHQgNgHgHgNQgGgJAAgMIABgIIACgGQACgIAEgHQAFgHAJgFQgJAFgFAHQgEAHgCAIIgCAGIgBAIQAAAMAGAJgAAjgQIgJgCIABgBIABgBIABAAQAIgGAFAAIACgBIAAAAQAHABgBAKIAAACIgEAAQgFAAgGgCg");
	this.shape_3.setTransform(11.2258,14.8422);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand2L, new cjs.Rectangle(-1,-1,24.5,30.5), null);


(lib.hand1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgYAUQACABABACQAIAIANAAQAMgBAJgJQAJgIAAgNQABgMgJgJQgDgEgEgBQgBgBgDAAQgEgCgGgBQgMADgJAIQgJAJAAALQAAAGABAGQACADACAEgAAPgaQgCAAgDAAQgOABgLAKQgKAJAAAQQAAAEABAG");
	this.shape.setTransform(8.2451,3.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgrAWQACACAiA5QAYApAeAGQAKACANgDQAqgMAIgsQABgKABgIQADgigHgdQgJglghgjQgSgTgVgLQgLgGgLgEQgEgCgFgBQgRgEgOACAg/hBQAAgBgPgMQgPgMgOAOQgLAMgDAeQAAAFgBAHQAAACAAADQAAAPAEANQAFARALAQQAWAaAPgHQAQgHAGgiAgZAGQAIgLAAgOQAAgQgKgMQgCgDgCgCQgHgGgHgEQgIgDgKAAAhAhQQAAAGABAJAgZAGQgggCAOASQAGgEAGgFQADgEADgDg");
	this.shape_1.setTransform(12.2833,13.1214);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgXAVIgDgDIgBgKQAAgQAKgJQALgJAOgBIAFgBQAEACADAEQAJAIgBAMQAAANgJAIQgJAJgMABQgNAAgIgIg");
	this.shape_2.setTransform(8.4264,3.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AAvCAQgegGgYgpQgig5gCgCQAGgEAGgFIAGgHIgGAHQgGAFgGAEIgBgBIAAAAIgBgBIAAAAIAAgBQgJgNAXAAIAAAAIAAAAIAGAAIgGAAIAAAAIAAAAQgXAAAJANIAAABIAAAAIABABIAAAAIABABQgGAigQAHQgPAHgWgaQgLgQgFgRQgEgNAAgPIAAgFIABgMQADgeALgMQAOgOAPAMIAPANQAKAAAIADQAHAEAHAGIAEAFQAKAMAAAQQAAAOgIALQAIgLAAgOQAAgQgKgMIgEgFQgHgGgHgEQgIgDgKAAIgBgPIACADQAJAIANAAQAMgBAJgJQAJgIABgOQAAgMgIgIQgEgEgEgCQAOgCARAEIAJADQALAEALAGQAVALASATQAhAjAJAlQAHAdgDAiIgCASQgIAsgqAMIgOACIgJgBgAgrAWIAAAAg");
	this.shape_3.setTransform(12.2833,13.1214);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand1, new cjs.Rectangle(-1,-1,26.6,28), null);


(lib.fingers = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgYgRIgBAAIAAgBQgBABgCADQgEAKADAKQAFANALAHQAIAGANgEQAMgDAHgLQABgDAEgFQgBAAAAAAIgBgBQgBgBAAgCQgFgLgNgKQgKgGgSACQgCAEgFACgAAeAFQABAAAAgBQABgGgDgGQgEgMgLgFQgNgFgJACQgGACgDACQgEACgDAF");
	this.shape.setTransform(27.0933,-0.1694);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAphRQAAAAAIgTQAHgRgPgJQgSgJgcAFQgFADgHABQgBAAgCACQgQADgLAHQgRAJgKAQQgVAaAKAPQAMAMAigBQg4glAUABQAaADAqANQApANABgDQAFgJACgGQAAgJgBgKgAA2hWQgHAAgGAFAgmglQgGAGgoArQgiAgABAfQABAMAHALQAXAmAsgEQAKgCAIgCQAggGAagOQAjgVAZgmQANgXAHgYQACgLAAgKQABgGABgGQgCgRgEgOAgkgjIAAAAIACABIAAABIACAAQADABAEACQAEADACADQgFgigOAVQACABAAABQAAgBgCgBAgnglQABgBAAABIAAAAg");
	this.shape_1.setTransform(19.0219,6.6548);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgNAYQgLgIgFgMQgDgLAEgJIADgEIAAAAIABAAQAFgCACgDQASgDAKAHQANAKAFALIABADIABAAIABAAIgFAJQgHAKgMADQgGACgEAAQgHAAgEgDg");
	this.shape_2.setTransform(27.0933,0.0745);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhtBiQgHgLgBgMQgBgfAiggIAugxIACACIAAAAIACABIAAABIACAAQADABAEACIAGAGIAAgCQgDgTgHAAIAAAAIAAAAQgEAAgEAGIgBABIAAABIAAAAIAAAAIAAgBIABgBQAEgGAEAAIAAAAIAAAAQAHAAADATIAAACIgGgGQgEgCgDgBIgCAAIAAgBIgCgBIAAAAIgCgCIACACIgCgCIAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIgBAAIgBgBIgCgBIgBgBQgxghARAAIABAAIAAAAIAAAAQAaADAqANIAAAAIAEABIAEACIABAAIACABIABAAIABAAIACABIAFABIACABIAAAAQAPAEAEAAIAAAAIABgBQAFgJACgGIAAgGIgBgNQAGgFAHAAIgDAEQgEAJAEAMQAEAMALAIQAJAFANgEQANgDAGgKIAFgJQAEAOACARIgCAMQAAAKgCALQgHAYgNAXQgZAmgjAVQgaAOggAGIgSAEIgIAAQgmAAgVgigAgTgYIAAAAgAgkgjIAAAAgAgkgjIAAAAgAhVgwQgKgPAVgaQAKgQARgJQALgHAQgDIADgCQAHgBAFgDQAcgFASAJQAPAJgHARIgIATIABANIAAAGQgCAGgFAJIgBABIAAAAQgEAAgPgEIAAAAIgCgBIgFgBIgCgBIgBAAIgBAAIgCgBIgBAAIgEgCIgEgBIAAAAQgqgNgagDIAAAAIAAAAIgBAAQgRAAAxAhIABABIACABIABABIABAAIgDAAQgfAAgMgLgAAphRIAAAAg");
	this.shape_3.setTransform(19.0219,6.6548);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fingers, new cjs.Rectangle(6.3,-7.6,25.5,28.5), null);


(lib.arm20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AiXlgQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgUAIgUgJQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHg");
	this.shape.setTransform(16.182,36.5165,1,1,3.5177);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("ABwFhQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgKAEgJAAQgKAAgLgFg");
	this.shape_1.setTransform(16.182,36.5165,1,1,3.5177);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm20, new cjs.Rectangle(-6,-6,44.4,85), null);


(lib.arm19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(2.7473,56.7983,1,1,-7.3213);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(15.5244,30.5016,1,1,-7.3213);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(2.7473,56.7983,1,1,-7.3213);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(15.5244,30.5016,1,1,-7.3213);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm19, new cjs.Rectangle(-6,-6,43.1,73), null);


(lib.arm18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(1,1,1).p("ABRgpQABAAASgIQARgIAKAQQAIAQgFAcQgCAGgBAGQAAACgCACQgDAQgHAMQgKAQgPALQgbAUgNgKQgNgLACgjQgDABguAvQgiAhgfgCQgLgBgLgGQgmgWAFgtQABgJABgIQAGgiAOgaQAUgjAogYQAXgOAWgGQALgDAMAAQAFgBAFABQASAAANAFABWg3QgBAHgEAHAAaASQgFgNAFgOQADgOAOgKQABgBAEgCQAHgEAIgCQAIgBAKACAAnAmQgFgEgDgIQgCgEgDgEQAgAGgTAOg");
	this.shape.setTransform(13.1889,11.7223);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#996600").ss(1,1,1).p("AgGgeQABAAACABQAEgBAHACQALAEAHALQAFALgCAKQgCAGgDAFQgBADgEADAgGgeQACABACABQAMAFAKANQAHAKgEAQQgCAEgCAFQgBABgDABQgJAGgMgEQgMgDgGgLQgHgKADgNQAEgMAJgFQAGgDADgCg");
	this.shape_1.setTransform(19.9167,3.6092);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC99").s().p("AhLB1QgLgBgLgGQgmgWAFgtIACgRQAGgiAOgaQAUgjAogYQAXgOAWgGQALgDAMAAQAFgBAFABQASAAANAFIgJAFQgKAFgDAMQgDAOAGAKQAGALANADQAMAEAKgGIADgCQgBAHgEAHIgCgBIgKgBIgBAAIAAAAIgFABIAAAAQgIACgHAEIgFADQgOAKgDAOQgDAIAAAGQAAAHADAGQgDgGAAgHQAAgGADgIQADgOAOgKIAFgDQAHgEAIgCIAAAAIAFgBIAAAAIABAAIAKABIACABQABAAASgIQARgIAKAQQAIAQgFAcIgDAMIgCAEQgDAQgHAMQgKAQgPALQgbAUgNgKQgNgLACgjQAHgFAAgEQAAgHgUgEIAFAIQADAIAFAEQgDABguAvQggAfgdAAIgEAAgAAnAmIAAAAgAAfAaIgFgIQAUAEAAAHQAAAEgHAFQgFgEgDgIg");
	this.shape_2.setTransform(13.1889,11.7223);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#996600").s().p("AgDAdQgNgDgGgLQgGgKADgNQADgMAKgFIAJgFIADACQANAFAKANQAHAKgEAQIgFAJIgDACQgGAEgGAAQgFAAgEgCg");
	this.shape_3.setTransform(19.6754,3.6092);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm18, new cjs.Rectangle(-1,-1,28.4,25.5), null);


(lib.arm16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(3.1924,62.3633,0.9999,0.9999,-32.3283);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(3.6554,33.1319,0.9999,0.9999,-32.3283);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(3.1924,62.3633,0.9999,0.9999,-32.3283);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(3.6554,33.1319,0.9999,0.9999,-32.3283);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm16, new cjs.Rectangle(-6,-6,19.3,78.3), null);


(lib.arm15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AgHj3QAJgCAGALQAHAMACANIANGoQABAKgDALQgCACgBADQgIAKgIABQgLgCgGgJQgFgGAAgIQgCgFAAgJIgPmlQAAgPAFgLQAGgKAMABg");
	this.shape.setTransform(3.0542,24.8019);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm15, new cjs.Rectangle(-6,-6,18.1,61.6), null);


(lib.arm14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAegCQABABABACQgDALgIAHQgJAKgNABQgKAAgLgKQgJgJAAgLQABgFgBgEQACgBADgCQAKgIAQgBQAMgCANAMQACAEADAFgAgfgJQABgBACgBQACgGAEgEQAKgIAMABQANABAHAHQAEAEADAFQACACABAH");
	this.shape.setTransform(7.15,3.1497);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhjQABgBABgVQACgSASAAQATABAXATQAEAFAFADQABABABAEQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQgBgBgBAAIABAAQAAABABAAQBCgFgTgIQgWgLgsgKQgqgJABgFQAAgJACgHQADgHAGgHgAgGhvQAGAEADAIAAvgVIgBAAIgBAAIAAAAIgCAAQgDgBgEAAQgGAAgDABQAWgaABAZQgCAAgBABQABgBADAAQABAHANA6QANAugQAaQgHAKgMAGQgnAVgigaQgIgGgGgGQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKQACgEADgFQAJgPALgJ");
	this.shape_1.setTransform(10.8019,14.0242);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgWARQgIgJgBgMQACgEgCgFIAFgCQALgJAPgBQAMgCAOANQABAEADAEIABAFQgCAJgIAIQgJAJgNABIgBAAQgKAAgKgJg");
	this.shape_2.setTransform(7.15,3.4874);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgeB+IgOgMQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKIAFgJQAJgPALgJQABAEgBAFQAAAMAJAJQAKAKAKAAQAOgBAJgKQAIgHADgLIgCgEQAGAEADAIIACgWQACgSASAAQATABAXATQAEAFAFADIACAFQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQA0gEgBgGQAAgBgEgCQgWgLgsgKQgpgJAAgFIAAAAIACgQQADgHAGgHQgGAHgDAHIgCAQIAAAAQAAAFApAJQAsAKAWALQAEACAAABQABAGg0AEIgCgBIABAAQgBAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAIADgBQAAgMgFAAIgBAAIAAAAQgFAAgIAIIgBABIgBACIgBABIgBABIAJgBIAHABIACAAIAAAAIABAAIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIAOBBQANAugQAaQgHAKgMAGQgRAJgRAAQgUAAgTgOgAAugVIgBAAIAAAAIgCAAIgHgBIgJABIABgBIABgBIABgCIABgBQAIgIAFAAIAAAAIABAAQAFAAAAAMIgDABgAAvgVIAAAAg");
	this.shape_3.setTransform(10.8019,14.0242);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm14, new cjs.Rectangle(-1,-1,23.6,30.1), null);


(lib.arm13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ABVjnQAKABACANQACANgEANIiQGPQgDAJgGAJQgDABgCADQgLAGgIgCQgKgGgDgLQgCgHACgIQABgFADgIICOmNQAGgOAIgHQAKgIAKAGg");
	this.shape.setTransform(9.7489,23.4582);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm13, new cjs.Rectangle(-6,-6,31.5,58.9), null);


(lib.arm12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAaARQAAABgCADQgHAHgMABQgMACgLgIQgIgGgDgOQgBgMAHgJQAEgDACgEQABgBADABQAEgEAGAAQAMAAAJAHQAKAKACAKQAAAFgBAFQAAADgDAGgAgRgZQACAAADABQAMgBAOAIQALAHADARQgCAEAAAG");
	this.shape.setTransform(14.7708,2.9609);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AA2hKQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfQA3AlgKgTQgLgWgcghQgcgiADgEQAFgGAGgFQAHgEAKgBgAA2hZQACAHgCAIAAsAQQgDAGgZA3QgSAsgcAKQgLAEgOgDQgrgHgNgqQgCgKAAgIQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEQAFgDAFgCQAQgGAOAAAAsAPQgCgBgCgBQACABACACQAAAAABABQAAgCgBAAIAAABAAoANIAAAAIgBAAIAAgBIgBgBQgCgCgDgDQgEgDgEgCQAhgFgOAT");
	this.shape_1.setTransform(12.0216,13.6771);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgRAWQgIgGgDgOQgBgMAHgKIAGgHIAFABQAMAAAOAIQALAHADARQgCADAAAGIgCAFQgHAHgMABIgEAAQgKAAgJgGg");
	this.shape_2.setTransform(14.6875,3.1375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("Ag3CEQgrgHgNgqIgCgSQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEIAKgFQAQgGAOAAIgGAHQgHAJACANQABAOAJAGQALAIANgCQALgBAIgHIACgEQACAHgCAIQgKABgHAEQgGAFgFAGIgBABQAAAGAaAfQAcAhALAWIAAABIABAAQACAFgDAAIAAAAQgHAAgbgRIgCgBIgBgBIAAAAIgBgBIgDgCIgBAAIgCgBIgBgBIABABIACABIABAAIADACIABABIAAAAIABABIACABQAbARAHAAIAAAAQADAAgCgFIgBAAIAAgBQgLgWgcghQgagfAAgGIABgBQAFgGAGgFQAHgEAKgBQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfIgBgCIAAgBIABAAIAAgBQAJgNgPAAIgBAAIAAAAIgMABIgBAAIAIAFIAFAFIABABIAAABIABAAIAAAAIAAAAIgBAAIAAgBIgBgBIgFgFIgIgFIABAAIAMgBIAAAAIABAAQAPAAgJANIAAABIgBAAIAAABIgEgCIAEADIgEgDIAEACIAAABIgcA9QgSAsgcAKQgGACgIAAIgLgBg");
	this.shape_3.setTransform(12.0216,13.6771);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm12, new cjs.Rectangle(-1,-1,26,29), null);


(lib.arm11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAfgCQABABAAADQgCAKgJAIQgJAJgNABQgKAAgKgKQgJgJAAgLQAAgEgBgFQABgBAAAAQACgBACAAQAKgJAQgCQAMgBANANQACADADAFIABAAAgegKQABAAABgBQACgHAFgDQAKgIALAAQANACAIAHQAEAFACAEQACADABAG");
	this.shape.setTransform(7.175,3.0747);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgRASgBQATABAXATQADAFAGAEQAAABACADQALAKAHALQAJAQABAUQAFAhgPAIQgQAEgdgRQgBgBAAAAQgDAAAAABIAAAAIgBAAIgBgBIgBABIgBAAQgEgBgEAAQgFABgEAAQAXgaABAZIAAABQAAAAABAAQBDgEgTgJQgXgLgrgKQgqgKAAgDQAAgKACgGQAEgIAFgIgAgFhvIAAAAQAFAEADAHAAwgVQAAgBADABQACAHANA5QANAtgRAbQgGAJgMAGQgnAWgjgaQgIgHgFgFQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIQABgFADgGQAJgOALgJ");
	this.shape_1.setTransform(10.836,13.9969);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgVARQgJgKAAgLIgBgJIABAAIAEgCQAKgIAQgCQAMgBANAMIAFAIIABABIAAAAIABAEQgCAKgJAHQgJAJgNABIgBAAQgKAAgJgJg");
	this.shape_2.setTransform(7.175,3.4225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIIAEgLQAJgOALgJIAAAJQAAAMAKAJQAJAKAKAAQAOgBAKgJQAIgIACgKIgBgFQAFAEADAHQABAAABgVQADgRASgBQATABAXATQADAFAGAEIACAEQALAKAHALQAJAQABAUQAFAhgPAIQgQAEgdgRQA0gEAAgGQAAgBgEgCQgXgLgrgKQgqgKAAgDIAAAAQAAgKACgGQAEgIAFgIQgFAIgEAIQgCAGAAAKIAAAAQAAADAqAKQArAKAXALQAEACAAABQAAAGg0AEIgBgBQgBgMgFAAIgBAAIgBAAQgFABgHAIIgCACIgBABIAAAAIgBABIAJgBIAIABIABAAIABgBIABABIABAAIAAAAIAAAAIABgBIABAAIABABIAPBAQANAtgRAbQgGAJgMAGQgSAKgSAAQgTAAgTgOgAAvgVIgBgBIgBABIgBAAIgIgBIgJABIABgBIAAAAIABgBIACgCQAHgIAFgBIABAAIABAAQAFAAABAMIgDABIAAAAgAAzgWIAAABIgBgBIgBAAIgBABIAAAAIADgBgAAzgWIAAAAg");
	this.shape_3.setTransform(10.836,13.9969);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm11, new cjs.Rectangle(-1,-1,23.7,30), null);


(lib.arm10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AAVj2QAKgBAFAMQAFAMABAOIglGmQgBAKgEALQgBABgCAEQgIAIgJAAQgMgDgEgKQgFgGABgIQgBgGAAgHIAkmlQACgPAGgKQAGgKAMADg");
	this.shape.setTransform(4.15,24.7154);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm10, new cjs.Rectangle(-6,-6,20.3,61.5), null);


(lib.arm9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgfgFQAAgBACgCQABgGAEgEQAKgJALgBQANgBAIAGQAFAEADAEQACACACAHQABABABADQgBAKgHAIQgIALgNACQgKACgMgIQgKgIgBgNQAAgDgBgEQACgCACgBQAKgKAPgEQAMgDAOALQACAEAEAE");
	this.shape.setTransform(6,3.9349);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgFhhQABgBgCgUQAAgTASgCQASgBAZAPQAFAFAFADQACABABADQANAJAJAKQALAPADATQAIAhgOAIQgPAHgegNQgBgBgBAAQgDABAAABQAAgBADgBQABABABAAQBBgNgUgGQgXgIgtgFQgrgEAAgEQgBgJABgHQACgIAGgIgAAwgYIgBAAIgBgBIAAABIgCAAQgDAAgEAAQgGABgDABQATgcAEAYIAAAAQADAHAUA3QATAtgNAbQgGALgLAHQgkAaglgVQgJgFgGgGQgegTgSgWQgYgggHguQgDgaACgXQADgMAEgKQABgFADgFQAHgQAJgKAgQhrQAGADAFAH");
	this.shape_1.setTransform(10.6787,14.0411);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgTAUQgKgIgBgMQAAgEgBgEIAEgDQAKgKAPgEQAMgDAPALQABAEAEAEIACAEQgBAKgHAIQgIALgOACIgCABQgIAAgLgHg");
	this.shape_2.setTransform(6,4.2196);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgKCDIgPgLQgegTgSgWQgYgggHguQgDgaACgXQADgMAEgKIAEgKQAHgQAJgKQACAEgBAEQACANAKAIQAMAIAKgCQANgCAIgLQAHgIABgLIgCgEQAGADAFAHIgBgVQAAgTASgCQASgBAZAPIAKAIQACABABADQANAJAJAKQALAPADATQAIAhgOAIQgPAHgegNQAxgKAAgGQAAgCgEgBQgXgIgtgFQgrgEAAgEIgBgJIABgHQACgIAGgIQgGAIgCAIIgBAHIABAJQAAAEArAEQAtAFAXAIQAEABAAACQAAAGgxAKIgCgBIgBgCQgBgJgFAAIAAAAIgBAAQgFABgHAJIgBABIgBABIAAAAIAAABIgBACIAJgCIAHAAIACAAIAAgBIABABIABAAIADgCIAXA+QATAtgNAbQgGALgLAHQgUAOgUAAQgRAAgQgJgAAcgWIABgCIAAgBIAAAAIABgBIABgBQAHgJAFgBIABAAIAAAAQAFAAABAJIABACIAAAAIgDACIADgCIgDACIgBAAIgBgBIAAABIgCAAIgHAAIgJACIAAAAgAAwgYIAAAAg");
	this.shape_3.setTransform(10.6787,14.0411);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm9, new cjs.Rectangle(-1,-1,23.4,30.1), null);


(lib.arm8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(2.6921,57.4301,0.9999,0.9999,-8.8301);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(14.7717,30.8075,0.9999,0.9999,-8.8301);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(2.6921,57.4301,0.9999,0.9999,-8.8301);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(14.7717,30.8075,0.9999,0.9999,-8.8301);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm8, new cjs.Rectangle(-6,-6,41.6,73.6), null);


(lib.arm7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ABHjrQALAAACANQACANgCAPIh5GUQgCAKgHAJQgCABgCAEQgLAGgIgCQgLgFgCgKQgEgHADgIQABgGABgHIB4mVQAFgOAJgIQAIgJAKAGg");
	this.shape.setTransform(8.5104,23.8785);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm7, new cjs.Rectangle(-6,-6,29,59.8), null);


(lib.arm6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(1,1,1).p("AAfA0QgHAEgzAbQgpAZgegKQgKgDgJgKQgfggAPgqQAFgJADgFQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEQAGAAAGABQAQAFAMAIAAfA1QAVBAAEgVQAEgZgBgsQgCgrADgBQALgCAFAAQAJACAJAEABngYQgCAGgHAFQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGQgBABgDACQgHAOgJAKQgNANgSAFQgfAOgMgNQgIgOAJghAAeAyIAAAAIAAgCIAAAAIgBgBIAAgCQAAgEgBgEQgCgEgCgDQAgAOgZAIQAAgCgBAAQABAAAAACAAfA0IAAAAQAAABAAAAQABgBgBAAg");
	this.shape.setTransform(13.879,10.6189);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#996600").ss(1,1,1).p("AAMAeIgBAAIAAABQAAAAgEABQgJABgKgGQgLgHgFgNQgDgJAHgLQAHgMAMgDQADgBAEgCQABAAAAABIAAAAQABAAABABQAGAAAFAEQALAIACALQACANgFAJQgDAFgEADQgCADgFADgAADgeQABABABACQALAIAGAOQAEALgIARQgDACgDAF");
	this.shape_1.setTransform(23.0238,5.0321);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC99").s().p("AAeBkQgIgOAJghIABADIABADIABADIABACIAAAAIAAABIAAABIABACIACAFIAAABIABABIABADIACAEIAAABIABABIAAAAIABAFIADAFIAAAAIACAEIAAAAIABABIAAAAIABABIAAAAIABABIAAAAIAAAAIAAAAIABAAIAAAAIAAAAQACAAABgFQADgSAAgcIAAgXIgBgZQAAgSACgBQALgCAFAAQAJACAJAEQgJgEgJgCQgFAAgLACQgCABAAASIABAZIAAAXQAAAcgDASQgBAFgCAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIgBgBIAAAAIgBgBIAAAAIgBgBIAAAAIgCgEIAAAAIgDgFIgBgFIAAAAIgBgBIAAgBIgCgEIgBgDIgBgBIAAgBIgCgFIgBgCIAAgBIAAgBIAAAAIgBgCIgBgDIgBgDIgBgDQAAAAABAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQALgDAAgFQAAgGgSgIIAEAHIABAIIAAACIABABIAAAAIAAACIAAAAIAAAAIAAgCIAAAAIgBgBIAAgCIgBgIIgEgHQASAIAAAGQAAAFgLADIgBgCIABACIg6AfQgpAZgegKQgKgDgJgKQgfggAPgqIAIgOQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEIAMABQAQAFAMAIIgJADQgMADgGAMQgHALADAKQAEANALAHQAKAGALgBIAEgBQgCAGgHAFQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGIgEADQgHAOgJAKQgNANgSAFQgQAHgLAAQgKAAgGgGgAAfA0IgBgCIABACg");
	this.shape_2.setTransform(13.879,10.6189);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#996600").s().p("AgJAbQgLgHgFgNQgDgJAHgLQAHgMAMgDIAHgDIABABIAAAAIACADQALAIAGAOQAEALgIARQgDACgDAFIgBAAIAAABIgEABIgDAAQgIAAgIgFg");
	this.shape_3.setTransform(22.719,5.0321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm6, new cjs.Rectangle(-1,-1,29.8,23.3), null);


(lib.arm5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgfgBQAAgBACgCQAAgGAEgFQAHgKAMgDQAMgCAKAFQAFADADAEQACABADAHAgfgBQACgCACgCQAIgLAOgFQALgFARAJQACADAEAEQACABABADQAAAKgFAJQgHALgNAFQgJADgMgHQgLgGgEgMQAAgFgCgDg");
	this.shape.setTransform(5.0521,4.7414);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgNhdQABgBgFgUQgCgSASgFQARgEAbAMQAFAEAGACQABABACADQAOAHAKAJQANANAFATQANAfgMALQgOAIgggJQgBgBgBABQgCAAgBACIAAAAIgBAAIgBABIgCAAQgDAAgEAAQgFACgDACQAOgfAIAYIAAAAQABAAABAAQA/gVgVgEQgZgEgsACQgrABgBgEQgCgJAAgHQABgIAFgJgAAxgcQABgBACgBQAEAGAbA0QAZApgKAeQgDALgKAJQggAfgpgQQgKgEgFgFQgggPgVgTQgdgdgNgsQgHgZAAgYQAAgMADgLQABgFACgFQAEgRAIgMAgZhmQAGACAGAH");
	this.shape_1.setTransform(10.6064,13.8973);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgOAWQgLgGgEgMQAAgEgCgEIAEgEQAIgLAOgFQALgFARAJQACADAEAEIADAEQAAAKgFAJQgHALgNAFIgGABQgGAAgJgFg");
	this.shape_2.setTransform(5.0521,5.0274);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AAMCGQgKgEgFgFQgggPgVgTQgdgdgNgsQgHgZAAgYQAAgMADgLIADgKQAEgRAIgMQADAFAAAEQADAMALAGQANAHAJgDQAOgEAGgMQAGgJgBgLIgCgEQAGACAGAHQgFAJgBAIQAAAHACAJQABADAWAAIAAAAIAAAAIASAAIADAAIABgBIAJAAIAGAAIAJAAIAAAAIABAAQAaAAAQADIABAAQAFABAAACQAAAGgvAQQAvgQAAgGQAAgCgFgBIgBAAQgQgDgaAAIgBAAIAAAAIgJAAIgGAAIgJAAIgBABIgDAAIgSAAIAAAAIAAAAQgWAAgBgDQgCgJAAgHQABgIAFgJIgEgVQgCgSASgFQARgEAbAMQAFAEAGACIADAEQAOAHAKAJQANANAFATQANAfgMALQgOAIgggJIgCAAIAAgBIAAAAIgBgBIAAgBQgDgIgEAAIAAAAIAAAAQgGABgHAOIAAABIgBABIAAABIAIgEIAHAAIACAAIABgBIABAAIAAAAQAAgBABAAQAAAAAAAAQABgBAAAAQABAAAAAAIAfA6QAZApgKAeQgDALgKAJQgVAUgZAAQgNAAgOgFgAAegXIAAgBIABgBIAAgBQAHgOAGgBIAAAAIAAAAQAEAAADAIIAAABIABABIAAAAIAAABIAAAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBAAAAABQAAgBABAAQAAAAAAAAQAAgBABAAQAAAAABAAQgBAAAAAAQgBAAAAABQAAAAAAAAQgBAAAAABIAAAAIgBAAIgBABIgCAAIgHAAIgIAEIAAAAgAAxgcIAAAAgAAxgcIAAAAg");
	this.shape_3.setTransform(10.6064,13.8973);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm5, new cjs.Rectangle(-1,-1,23.2,29.8), null);


(lib.arm4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAegCIABAAIAAAAQABABAAADQgCAKgIAIQgKAJgNABQgKAAgJgKQgKgJAAgLQAAgEgBgFQABgBAAAAIABAAQAAAAABgBQACgGAFgEQAKgIALAAQANACAIAHQAEAFACAEQACADABAGgAgdgKQABgBACAAQALgIAPgDQAMAAAOAMQABADADAF");
	this.shape.setTransform(7.175,3.0747);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgSARAAQAUABAXATQADAFAGADQAAABABADQAMALAHALQAJAQABATQAFAigQAIQgQAEgcgSQBCgEgSgJQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIgAgFhvQAFADADAIAAwgWIAAABIgCgBIAAAAIgBABIgCgBQgDgBgEAAQgGABgDABQAWgbABAaQgBAAgBAAQABAAABAAQADAIAMA5QANAtgQAaQgHAJgLAHQgnAWgjgaQgIgHgFgFQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIQACgGADgGQAJgOAKgJAA0gWQgBgBgBABIAAAAQABABABgBg");
	this.shape_1.setTransform(10.8595,14.0042);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgUARQgKgJAAgMIgBgJIABAAIABAAIADgCQALgIAPgCQAMgBAOAMQABAEADAEIABABIAAAAIABAEQgCAKgIAIQgKAIgNABIgBAAQgKAAgIgJg");
	this.shape_2.setTransform(7.175,3.4252);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIIAFgMQAJgOAKgJIABAJQAAANAKAJQAJAKAKgBQAOgBAKgIQAIgIACgLIgBgEQAFADADAIQgFAIgEAIQgCAFAAALQAAADApAKQArAKAYAKQAEACAAACQAAAGg0ADQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAQAAgMgFAAIgBAAIAAAAQgFAAgIAJIAAAAIgBABIgBACIAAAAIgBABIgBAAIAJgCIAHABIACABIABgBIAAAAIACABIAAgBIAAABIgCgBIAAAAIgBABIgCgBIgHgBIgJACIABAAIABgBIAAAAIABgCIABgBIAAAAQAIgJAFAAIAAAAIABAAQAFAAAAAMIgCAAIACAAIgCAAIACAAIAAAAQADAIAMA5QANAtgQAaQgHAJgLAHQgSAKgRAAQgUAAgTgOgAA0gWQA0gDAAgGQAAgCgEgCQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIQABAAABgVQADgSARAAQAUABAXATQADAFAGADIABAEQAMALAHALQAJAQABATQAFAigQAIIgGABQgPAAgXgPgAAygWgAAygWIAAAAgAADhkIAAAAg");
	this.shape_3.setTransform(10.8595,14.0042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm4, new cjs.Rectangle(-1,-1,23.7,30), null);


(lib.arm3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAfACQAAgBAAgCQgBgFgBgFQgIgLgLgFQgLgEgLAFQgGACgEAEQgDADgCAEAAfACQgBgCgCgCQgGgNgPgGQgLgFgOAHQgFACgEAEQgBACAAABQgEAKAGAMQAFALAMAFQALAEAMgFQAMgFADgLQADgFgBgEg");
	this.shape.setTransform(17.0462,5.2697);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgwgiQgCADglA2QgaApAIAcQACALAIAJQAcAiAsgMQAJgDAJgDQAfgLAXgTQAegZARgsQAKgZABgWQABgNgBgMQgBgFAAgEQgEgSgJgLAAWhZQAAgCAEgSQAFgSgTgHQgOgFgcAKQgFACgHADQgCABgCAAQgOAHgLAJQgNANgJARQgPAeANALQANALAigJAAihhQgFADgHAFAgagZQAOACAMgGQAOgHAGgOQACgCACgDQADgJgBgIQAAgIgEgJAgagZQgMgegKAVQAFAEAIADQAEABAFABg");
	this.shape_1.setTransform(10.7703,13.6954);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgJAZQgMgFgFgLQgGgLAEgLIABgDIAJgGQAOgHALAFQAPAGAGANIADAFQABADgDAFQgDALgMAFQgHADgGAAQgFAAgFgCg");
	this.shape_2.setTransform(17.0462,5.5599);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhfBwQgIgJgCgLQgIgcAagpIAng5QgiAJgNgLQgNgLAPgeQAJgRANgNQALgJAOgHIAEgBIAMgFQAcgKAOAFQATAHgFASIgEAUIAMgIIgBADQgDALAFAMQAGALAMAFQALAEANgFQALgFAEgLQACgFgBgEQAJALAEASIABAJQABAMgBANQgBAWgKAZQgRAsgeAZQgXATgfALIgSAGQgMADgKAAQgdAAgVgZgAgagZQAOACAMgGQAOgHAGgOIAEgFQACgIAAgHIAAgCQAAgIgEgJQAEAJAAAIIAAACQAAAHgCAIIgEAFQgGAOgOAHQgMAGgOgCIgBgBIAAgBIAAAAQgGgQgGAAIgBAAIAAAAQgEABgDAGIgBAAIAAACQAFAEAIADIAJACIAAAAgAgjgbQgIgDgFgEIAAgCIABAAQADgGAEgBIAAAAIABAAQAGAAAGAQIAAAAIAAABIABABIgJgCg");
	this.shape_3.setTransform(10.7703,13.6954);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm3, new cjs.Rectangle(-1,-1,23.6,29.4), null);


(lib.arm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.7,1,1).p("AAYAAQAAAJgIAHQgGAHgKAAQgJAAgGgHQgIgHAAgJQAAgJAIgHQAGgHAJAAQAKAAAGAHQAIAHAAAJg");
	this.shape.setTransform(32.9411,4.582,0.9999,0.9999,0,33.1134,-146.8866);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfkGIAAAUIAAH7QAAATgJANQgIAMgMABQgBAAAAAAIgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAHgMAMgBIACAAQAAAAABAAQABAAAAAAQALABAIALIAAABQAHAKACAN");
	this.shape_1.setTransform(18.6999,26.5999,0.9999,0.9999,0,33.1134,-146.8866);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgUAcQgKgIgDgLQgEgQALgNQAHgJAMgDQALgDALAFIABAAIAAABQAHAKACANQgCgNgHgKIAAgBQAKAFAFALIADAIQABAGgBAEIAAABIAAACQgCAJgHAIIgDADQgKAIgMAAIAAAAQgLAAgJgHgAgbAFQAAAJAHAHQAHAHAJAAQAJAAAHgHQAHgHAAgJIAAAAQAAgJgHgHQgHgHgJAAQgJAAgHAHQgHAHAAAJIAAAAgAAZAYIAAgUgAgUAVQgHgHAAgJQAAgJAHgHQAHgHAJAAQAJAAAHAHQAHAHAAAJIAAAAQAAAJgHAHQgHAHgJAAQgJAAgHgHgAATAFIAAAAgAAQgeIAAAAg");
	this.shape_2.setTransform(32.81,3.9537,0.9999,0.9999,0,33.1134,-146.8866);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AABE2IgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAIgMALgBIACAAIABAAIABAAQALABAIALQgIgLgLgBQAPABALAMQAJAKACANIgDgIQgFgLgKgFIgBAAQgLgFgLADQgMADgHAJQgLANAEARQADALAKAIQAKAHAKAAQAMAAAKgIIADgDIAAH7QAAATgJANQgIAMgMABQAMgBAIgMQAJgNAAgTIAAn7QAHgIACgJIAAgCIABIOQAAATgMANQgLAMgQABIgBAAgAgcEpQgMgNAAgTIABoRQAAgTALgNQALgNAQAAQgLABgIAMQgJANAAATIgBIRQAAATAKANQAJANALAAQgPAAgNgNgAAfjygAgBk1IAAAAg");
	this.shape_3.setTransform(18.7208,26.6136,0.9999,0.9999,0,33.1134,-146.8866);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm, new cjs.Rectangle(-5.4,-5.8,48.199999999999996,64.7), null);


(lib._2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgeAGQABgCACgCQAFgMAMgJQAKgHASADQADADAFACAgeAGQAAgBABgCQgBgFACgFQAFgNAKgFQANgFAJACQAGACAEACQACABAFAFQABABACADQAEAKgDAJQgEANgMAIQgIAGgNgEQgMgDgHgLQgBgEgDgEg");
	this.shape.setTransform(3.6192,6.4075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAngkQAFAFApArQAiAhgCAfQAAAMgHAKQgYAngrgFQgLgBgHgDQghgGgagOQgjgUgZgnQgNgXgGgXQgDgMABgKQgBgFAAgGQAAgRAFgOAgohQQABgBgKgTQgHgQAQgJQARgJAcAEQAFADAHABQABAAADACQAPAEAMAGQAQAJAKAQQAVAbgKAOQgLAMghgBQA3glgVACQgZADgqANQgpAMgCgDQgEgJgCgGQgBgJACgJgAAlgiIgBAAIgBAAIAAABIgCABQgDABgEABQgEAEgDACQAGgiAOAWQgDABABABQgBgBADgBQABAAABgBQgBAAgBABIAAAAAg2hWQAHABAHAF");
	this.shape_1.setTransform(11.7282,13.2287);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgHAZQgMgDgHgKQgBgEgDgEIADgEQAFgMAMgJQAKgIASAEQADADAFACIADADQAEALgDAJQgEANgMAIQgEADgHAAIgKgCg");
	this.shape_2.setTransform(3.6192,6.6535);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AArCEQgLgBgHgDQghgGgagOQgjgUgZgnQgNgXgGgXQgDgMABgKIgBgLQAAgRAFgOQADAEABAEQAHALAMADQAOAEAIgGQAMgIAEgNQADgKgEgKIgDgEQAHABAHAFQABgBgKgTQgHgQAQgJQARgJAcAEQAFADAHABIAEACQAPAEAMAGQAQAJAKAQQAVAbgKAOQgLAMghgBIACgBIABgBIAEgCIAAgBQAsgegPAAIgCAAQgZADgqANIgBAAIgBAAIgBABIgCAAQgZAIgJABIgBAAIgBAAIAAAAIgCgBIgGgPIgBgFQAAgGACgHQgCAHAAAGIABAFIAGAPIACABIAAAAIABAAIABAAQAJgBAZgIIACAAIABgBIABAAIABAAQAqgNAZgDIACAAQAPAAgsAeIAAABIgEACIgBABIgCABQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAABQgFgIgEgBIgBAAIAAAAQgGAAgEAVIAHgGIAHgCIACgBIAAgBIABAAIABAAIAAAAIACgCIgCACIAAAAIAAAAIACgCIAAAAIAuAwQAiAhgCAfQAAAMgHAKQgVAiglAAIgJAAgAAdgtIAAAAIABAAQAEABAFAIIgCACIAAAAIgBAAIgBAAIAAABIgCABIgHACIgHAGQAEgVAGAAgAAlgiIAAAAgAAlgiIAAAAg");
	this.shape_3.setTransform(11.7282,13.2287);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._2, new cjs.Rectangle(-1,-1,25.5,28.5), null);


(lib._1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.7,1,1).p("AAYAAQAAAJgIAHQgGAHgKAAQgJAAgGgHQgIgHAAgJQAAgJAIgHQAGgHAJAAQAKAAAGAHQAIAHAAAJg");
	this.shape.setTransform(4.2,4.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfkGIAAAUIAAH7QAAATgJANQgIAMgMABQgBAAAAAAIgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAHgMAMgBIACAAQAAAAABAAQABAAAAAAQALABAIALIAAABQAHAKACAN");
	this.shape_1.setTransform(4.1,31.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgUAcQgKgIgDgLQgEgQALgNQAHgJAMgDQALgDALAFIABAAIAAABQAHAKACANQgCgNgHgKIAAgBQAKAFAFALIADAIQABAGgBAEIAAABIAAACQgCAJgHAIIgDADQgKAIgMAAIAAAAQgLAAgJgHgAgbAFQAAAJAHAHQAHAHAJAAQAJAAAHgHQAHgHAAgJIAAAAQAAgJgHgHQgHgHgJAAQgJAAgHAHQgHAHAAAJIAAAAgAAZAYIAAgUgAgUAVQgHgHAAgJQAAgJAHgHQAHgHAJAAQAJAAAHAHQAHAHAAAJIAAAAQAAAJgHAHQgHAHgJAAQgJAAgHgHgAATAFIAAAAgAAQgeIAAAAg");
	this.shape_2.setTransform(4.6532,4.3453);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AABE2IgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAIgMALgBIACAAIABAAIABAAQALABAIALQgIgLgLgBQAPABALAMQAJAKACANIgDgIQgFgLgKgFIgBAAQgLgFgLADQgMADgHAJQgLANAEARQADALAKAIQAKAHAKAAQAMAAAKgIIADgDIAAH7QAAATgJANQgIAMgMABQAMgBAIgMQAJgNAAgTIAAn7QAHgIACgJIAAgCIABIOQAAATgMANQgLAMgQABIgBAAgAgcEpQgMgNAAgTIABoRQAAgTALgNQALgNAQAAQgLABgIAMQgJANAAATIgBIRQAAATAKANQAJANALAAQgPAAgNgNgAAfjygAgBk1IAAAAg");
	this.shape_3.setTransform(4.075,31.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._1, new cjs.Rectangle(-5,-6,18.2,74.1), null);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Scene_1_thighR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// thighR
	this.instance = new lib.thigh();
	this.instance.setTransform(712.2,602.3,1,1,-14.9992,0,0,13.1,19.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(12).to({y:602.4},0).wait(1).to({rotation:-17.9854,x:720.6,y:601},0).wait(1).to({rotation:-20.9719,x:729,y:599.6},0).wait(1).to({rotation:-24.7214,x:735.4,y:597.15},0).wait(1).to({rotation:-28.4708,x:741.8,y:594.75},0).wait(1).to({rotation:-32.2203,x:748.3,y:592.3},0).wait(1).to({rotation:-35.9698,x:754.7,y:589.85},0).wait(1).to({rotation:-38.3864,x:757.45,y:588.2},0).wait(1).to({rotation:-40.8029,x:760.25,y:586.55},0).wait(1).to({rotation:-43.2195,x:763,y:584.9},0).wait(5).to({regX:13,rotation:-44.9988,x:762.9,y:585.55},0).wait(51).to({regX:12.5,regY:16.2,scaleX:0.9999,scaleY:0.9999,rotation:-44.9981,x:763},0).wait(1).to({regX:13.1,regY:19.4,scaleX:1,scaleY:1,rotation:-42.4052,x:761.05,y:589.1},0).wait(1).to({rotation:-39.8118,x:756.45,y:590.85},0).wait(1).to({rotation:-37.2183,x:751.9,y:592.65},0).wait(1).to({rotation:-34.6248,x:747.3,y:594.3},0).wait(1).to({rotation:-32.0313,x:742.7,y:596.05},0).wait(1).to({rotation:-29.4378,x:738.1,y:597.8},0).wait(1).to({rotation:-26.8444,x:733.45,y:599.5},0).wait(1).to({rotation:-24.2509,x:728.85,y:601.2},0).wait(1).to({rotation:-23.0884,x:726.85,y:601.15},0).wait(1).to({rotation:-21.9259,x:724.9},0).wait(1).to({rotation:-20.7634,x:722.95,y:601.1},0).wait(1).to({rotation:-19.6009,x:720.95,y:601.05},0).wait(1).to({rotation:-18.4384,x:719,y:601},0).wait(1).to({rotation:-17.2759,x:717,y:600.9},0).wait(5).to({regX:13.2,regY:19.6,scaleX:0.9999,scaleY:0.9999,rotation:-14.9746,x:713.8,y:606.65},0).to({_off:true},121).wait(192));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_thighL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// thighL
	this.instance = new lib.thigh();
	this.instance.setTransform(651.15,582.55,1,1,-7.7628,0,0,15.8,-0.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(1).to({regX:13.1,regY:19.4,rotation:-4.9471,x:646.4,y:600.2},0).wait(1).to({rotation:-2.1313,x:641.7,y:597.65},0).wait(1).to({rotation:0.6845,x:636.95,y:595},0).wait(1).to({rotation:0.6845},0).wait(3).to({regX:15.9,regY:-1.4,rotation:7.2364,x:641.1,y:582.6},0).wait(127).to({regX:14.6,regY:-0.1,rotation:7.2355,y:582.55},0).wait(1).to({regX:13.1,regY:19.4,rotation:8.2041,x:633.05,y:600.3},0).wait(1).to({rotation:9.1713,x:628.95,y:598.95},0).wait(1).to({rotation:10.1385,x:624.9,y:597.6},0).wait(1).to({rotation:11.1057,x:622.1,y:596.5},0).wait(1).to({rotation:12.0729,x:619.4,y:595.45},0).wait(1).to({rotation:13.0401,x:616.6,y:594.35},0).wait(1).to({rotation:14.0073,x:613.9,y:593.25},0).wait(1).to({rotation:14.9745,x:611.15,y:592.2},0).wait(1).to({rotation:15.9417,x:608.4,y:591.1},0).wait(1).to({rotation:18.9417,x:605.15,y:589.3},0).wait(1).to({rotation:21.9416,x:601.85,y:587.5},0).wait(1).to({rotation:24.9416,x:598.6,y:585.55},0).wait(1).to({rotation:27.9415,x:595.3,y:583.7},0).wait(1).to({rotation:30.9415,x:592.15,y:581.7},0).wait(1).to({rotation:31.9762,x:590.45,y:580.4},0).wait(1).to({rotation:33.0109,x:588.8,y:579.1},0).wait(1).to({rotation:34.0456,x:587.1,y:577.8},0).wait(1).to({rotation:35.0803,x:585.4,y:576.6},0).wait(1).to({rotation:36.115,x:583.8,y:575.2},0).wait(1).to({rotation:37.1497,x:582.15,y:573.9},0).wait(1).to({rotation:38.1844,x:580.45,y:572.65},0).wait(4).to({regX:16,regY:-1.4,scaleX:0.9999,scaleY:0.9999,rotation:48.2822,x:590.6,y:552.75},0).wait(32).to({regX:13.9,regY:-1.2,x:590.5,y:552.65},0).wait(1).to({regX:13.1,regY:19.4,rotation:46.4074,x:577.9,y:568},0).wait(1).to({rotation:44.5325,x:581.2,y:570.25},0).wait(1).to({rotation:42.6577,x:584.5,y:572.4},0).wait(1).to({rotation:40.7829,x:587.85,y:574.6},0).wait(1).to({rotation:38.908,x:590.5,y:576.2},0).wait(1).to({rotation:37.0332,x:593.15,y:577.75},0).wait(1).to({rotation:35.1583,x:595.9,y:579.3},0).wait(1).to({rotation:33.2835,x:598.6,y:580.8},0).wait(1).to({rotation:31.1406,x:601.7,y:582.5},0).wait(1).to({rotation:28.9978,x:604.85,y:584.15},0).wait(1).to({rotation:26.8549,x:608.05,y:585.8},0).wait(1).to({rotation:24.7121,x:611.2,y:587.4},0).wait(1).to({scaleX:1,scaleY:1,rotation:22.5692,x:614.25,y:588.4},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:20.4264,x:617.45,y:589.3},0).wait(1).to({rotation:18.2835,x:620.5,y:590.15},0).wait(2).to({regX:16.1,regY:-1.3,rotation:-3.9973,x:653.25,y:584.55},0).to({_off:true},9).wait(188));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_spotlight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// spotlight
	this.instance = new lib.spotlight();
	this.instance.setTransform(490.5,333.15,1.0158,1.0158,0.4002,0,0,290.8,326.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:582.3,regY:578.7,scaleX:1.0159,scaleY:1.0159,rotation:0.4215,x:784.7,y:591.1},0).wait(1).to({rotation:0.4417,x:784.55,y:591.2},0).wait(1).to({rotation:0.4619,x:784.5,y:591.25},0).wait(1).to({rotation:0.4821,x:784.4,y:591.35},0).wait(1).to({rotation:0.5023,x:784.3,y:591.4},0).wait(1).to({rotation:0.5225,x:784.25,y:591.45},0).wait(1).to({rotation:0.5427,x:784.15,y:591.55},0).wait(1).to({rotation:0.5629,x:784.05,y:591.6},0).wait(1).to({rotation:0.5831,x:783.95,y:591.65},0).wait(1).to({rotation:0.6033,x:783.85,y:591.7},0).wait(1).to({rotation:0.6235,x:783.75,y:591.8},0).wait(1).to({rotation:0.6437,x:783.7,y:591.9},0).wait(1).to({rotation:0.6639,x:783.6,y:591.95},0).wait(1).to({rotation:0.6841,x:783.55,y:592},0).wait(1).to({rotation:0.7043,x:783.45},0).wait(1).to({rotation:0.7245,x:783.3,y:592.05},0).wait(1).to({rotation:0.7447,x:783.25,y:592.2},0).wait(1).to({rotation:0.7649,x:783.1,y:592.25},0).wait(1).to({rotation:0.7851,x:783,y:592.3},0).wait(1).to({rotation:0.8053,x:782.95,y:592.35},0).wait(1).to({rotation:0.8255,x:782.85,y:592.4},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:0.8457,x:782.75,y:592.55},0).wait(1).to({rotation:0.8659,x:782.65,y:592.6},0).wait(1).to({rotation:0.8861,x:782.55,y:592.65},0).wait(1).to({rotation:0.9063,x:782.5,y:592.7},0).wait(1).to({rotation:0.9265,x:782.4,y:592.8},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:0.9467,x:782.3,y:592.85},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:0.9669,x:782.25,y:592.95},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:0.9871,x:782.15,y:593},0).wait(1).to({rotation:1.0073,x:782,y:593.05},0).wait(1).to({rotation:1.0275,x:781.95,y:593.15},0).wait(1).to({rotation:1.0477,x:781.85},0).wait(1).to({rotation:1.0679,x:781.8,y:593.2},0).wait(1).to({rotation:1.0881,x:781.65,y:593.3},0).wait(1).to({rotation:1.1083,x:781.55,y:593.4},0).wait(1).to({rotation:1.1285,x:781.45,y:593.45},0).wait(1).to({rotation:1.1487,x:781.35,y:593.5},0).wait(1).to({rotation:1.1689,x:781.3,y:593.55},0).wait(1).to({rotation:1.1891,x:781.2,y:593.6},0).wait(1).to({rotation:1.2093,x:781.1,y:593.75},0).wait(1).to({rotation:1.2295,x:781.05,y:593.8},0).wait(1).to({rotation:1.2497,x:780.95},0).wait(1).to({rotation:1.2699,x:780.85,y:593.85},0).wait(1).to({rotation:1.2901,x:780.7,y:593.95},0).wait(1).to({rotation:1.3104,x:780.6,y:594},0).wait(1).to({rotation:1.3306,x:780.55,y:594.1},0).wait(1).to({rotation:1.3508,x:780.45,y:594.15},0).wait(1).to({rotation:1.371,x:780.35,y:594.2},0).wait(1).to({rotation:1.3912,x:780.3,y:594.3},0).wait(1).to({rotation:1.4114,x:780.2,y:594.35},0).wait(1).to({rotation:1.4316,x:780.1,y:594.45},0).wait(1).to({rotation:1.4518,x:780,y:594.5},0).wait(1).to({rotation:1.472,x:779.9,y:594.55},0).wait(1).to({rotation:1.4922,x:779.85,y:594.6},0).wait(1).to({rotation:1.5124,x:779.7,y:594.65},0).wait(1).to({rotation:1.5326,x:779.65,y:594.7},0).wait(1).to({rotation:1.5528,x:779.5,y:594.85},0).wait(1).to({rotation:1.573,x:779.4,y:594.9},0).wait(1).to({rotation:1.5932,x:779.35,y:594.95},0).wait(1).to({rotation:1.6134,x:779.25,y:595},0).wait(1).to({rotation:1.6336,x:779.2,y:595.1},0).wait(1).to({rotation:1.6538,x:779.1,y:595.15},0).wait(1).to({rotation:1.674,x:778.95},0).wait(1).to({rotation:1.6942,x:778.85,y:595.25},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:1.7144,x:778.75,y:595.35},0).wait(1).to({rotation:1.7346,x:778.7,y:595.4},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:1.7548,x:778.6,y:595.45},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:1.775,x:778.5,y:595.5},0).wait(1).to({rotation:1.7952,x:778.45,y:595.65},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:1.8154,x:778.35},0).wait(1).to({rotation:1.8356,x:778.2,y:595.7},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:1.8558,x:778.1,y:595.75},0).wait(1).to({rotation:1.876,x:778,y:595.85},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:1.8962,x:777.95,y:595.9},0).wait(1).to({rotation:1.9164,x:777.85,y:596},0).wait(1).to({rotation:1.9366,x:777.8,y:596.05},0).wait(1).to({rotation:1.9568,x:777.7,y:596.1},0).wait(1).to({rotation:1.977,x:777.6,y:596.15},0).wait(1).to({rotation:1.9972,x:777.45,y:596.2},0).wait(1).to({rotation:2.0174,x:777.35,y:596.25},0).wait(1).to({rotation:2.0376,x:777.3,y:596.4},0).wait(1).to({rotation:2.0578,x:777.2,y:596.45},0).wait(1).to({rotation:2.078,x:777.15,y:596.5},0).wait(1).to({rotation:2.0982,x:777.05,y:596.6},0).wait(1).to({rotation:2.1184,x:776.9},0).wait(1).to({rotation:2.1386,x:776.8,y:596.65},0).wait(1).to({rotation:2.1588,x:776.7,y:596.75},0).wait(1).to({rotation:2.179,x:776.65,y:596.85},0).wait(1).to({rotation:2.1992,x:776.55,y:596.9},0).wait(1).to({rotation:2.2194,x:776.45},0).wait(1).to({rotation:2.2396,x:776.35,y:596.95},0).wait(1).to({rotation:2.2598,x:776.2,y:597.05},0).wait(1).to({rotation:2.28,x:776.15,y:597.15},0).wait(1).to({rotation:2.3002,x:776.05,y:597.2},0).wait(1).to({rotation:2.3204,x:776,y:597.25},0).wait(1).to({rotation:2.3406,x:775.9,y:597.35},0).wait(1).to({rotation:2.3608,x:775.8},0).wait(1).to({rotation:2.381,x:775.7,y:597.4},0).wait(1).to({rotation:2.4012,x:775.55,y:597.55},0).wait(1).to({rotation:2.4214,x:775.5,y:597.6},0).wait(1).to({rotation:2.4416,x:775.4,y:597.65},0).wait(1).to({rotation:2.4618,x:775.35,y:597.7},0).wait(1).to({rotation:2.482,x:775.2,y:597.75},0).wait(1).to({rotation:2.5022,x:775.1,y:597.8},0).wait(1).to({rotation:2.5225,x:775.05,y:597.9},0).wait(1).to({rotation:2.5427,x:774.9,y:598},0).wait(1).to({rotation:2.5629,x:774.85,y:598.05},0).wait(1).to({rotation:2.5831,x:774.75},0).wait(1).to({rotation:2.6033,x:774.65,y:598.1},0).wait(1).to({rotation:2.6235,x:774.55,y:598.2},0).wait(1).to({rotation:2.6437,x:774.45,y:598.3},0).wait(1).to({rotation:2.6639,x:774.4,y:598.35},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:2.6841,x:774.25,y:598.4},0).wait(1).to({rotation:2.7043,x:774.15,y:598.45},0).wait(1).to({rotation:2.7245,x:774.05,y:598.5},0).wait(1).to({rotation:2.7447,x:774,y:598.55},0).wait(1).to({rotation:2.7649,x:773.9,y:598.7},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:2.7851,x:773.85,y:598.75},0).wait(1).to({rotation:2.8053,x:773.7},0).wait(1).to({rotation:2.8255,x:773.6,y:598.85},0).wait(1).to({rotation:2.8457,x:773.5,y:598.9},0).wait(1).to({rotation:2.8659,x:773.4,y:598.95},0).wait(1).to({rotation:2.8861,x:773.35,y:599.05},0).wait(1).to({rotation:2.9063,x:773.2,y:599.1},0).wait(1).to({rotation:2.9265,x:773.15,y:599.15},0).wait(1).to({rotation:2.9467,x:773.05,y:599.2},0).wait(1).to({rotation:2.9669,x:773,y:599.3},0).wait(1).to({rotation:2.9871,x:772.8},0).wait(1).to({rotation:3.0073,x:772.7,y:599.4},0).wait(1).to({rotation:3.0275,x:772.65,y:599.5},0).wait(1).to({rotation:3.0477,x:772.55,y:599.55},0).wait(1).to({rotation:3.0679,x:772.5,y:599.6},0).wait(1).to({rotation:3.0881,x:772.35,y:599.65},0).wait(1).to({rotation:3.1083,x:772.3,y:599.7},0).wait(1).to({rotation:3.1285,x:772.15,y:599.8},0).wait(1).to({rotation:3.1487,x:772.1,y:599.85},0).wait(1).to({rotation:3.1689,x:771.95,y:599.9},0).wait(1).to({rotation:3.1891,x:771.85,y:599.95},0).wait(1).to({rotation:3.2093,x:771.8,y:600},0).wait(1).to({rotation:3.2295,x:771.7,y:600.1},0).wait(1).to({rotation:3.2497,x:771.6},0).wait(1).to({rotation:3.2699,x:771.45,y:600.2},0).wait(1).to({rotation:3.2901,x:771.4,y:600.3},0).wait(1).to({rotation:3.3103,x:771.3,y:600.35},0).wait(1).to({rotation:3.3305,x:771.25,y:600.4},0).wait(1).to({rotation:3.3507,x:771.1,y:600.45},0).wait(1).to({rotation:3.3204,x:771.25,y:600.3},0).wait(1).to({rotation:3.2901,x:771.4,y:600.1},0).wait(1).to({rotation:3.2597,x:771.55,y:599.9},0).wait(1).to({rotation:3.2294,x:771.7,y:599.7},0).wait(1).to({rotation:3.1991,x:771.85,y:599.55},0).wait(1).to({rotation:3.1688,x:771.95,y:599.35},0).wait(1).to({rotation:3.1385,x:772.1,y:599.2},0).wait(1).to({rotation:3.1081,x:772.3,y:598.95},0).wait(1).to({rotation:3.0778,x:772.4,y:598.75},0).wait(1).to({rotation:3.0475,x:772.55,y:598.6},0).wait(1).to({rotation:3.0172,x:772.7,y:598.45},0).wait(1).to({rotation:2.9868,x:772.85,y:598.2},0).wait(1).to({rotation:2.9565,x:773,y:598.05},0).wait(1).to({rotation:2.9262,x:773.15,y:597.85},0).wait(1).to({rotation:2.8959,x:773.25,y:597.65},0).wait(1).to({rotation:2.8655,x:773.4,y:597.5},0).wait(1).to({rotation:2.8352,x:773.55,y:597.3},0).wait(1).to({rotation:2.8049,x:773.7,y:597.1},0).wait(1).to({rotation:2.7746,x:773.85,y:596.95},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:2.7442,x:774,y:596.75},0).wait(1).to({rotation:2.7139,x:774.1,y:596.55},0).wait(1).to({rotation:2.6836,x:774.25,y:596.35},0).wait(1).to({rotation:2.6533,x:774.45,y:596.2},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:2.623,x:774.55,y:595.95},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:2.5926,x:774.65,y:595.8},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:2.5623,x:774.85,y:595.65},0).wait(1).to({rotation:2.532,x:775,y:595.45},0).wait(1).to({rotation:2.5017,x:775.1,y:595.2},0).wait(1).to({rotation:2.4713,x:775.25,y:595.05},0).wait(1).to({rotation:2.441,x:775.4,y:594.9},0).wait(1).to({rotation:2.4107,x:775.55,y:594.7},0).wait(1).to({rotation:2.3804,x:775.7,y:594.45},0).wait(1).to({rotation:2.35,x:775.85,y:594.3},0).wait(1).to({rotation:2.3197,x:775.95,y:594.15},0).wait(1).to({rotation:2.2894,x:776.1,y:593.95},0).wait(1).to({rotation:2.2591,x:776.25,y:593.7},0).wait(1).to({rotation:2.2287,x:776.45,y:593.55},0).wait(1).to({rotation:2.1984,x:776.55,y:593.4},0).wait(1).to({rotation:2.1681,x:776.65,y:593.15},0).wait(1).to({rotation:2.1378,x:776.8,y:592.95},0).wait(1).to({rotation:2.1075,x:776.95,y:592.8},0).wait(1).to({rotation:2.0771,x:777.1,y:592.65},0).wait(1).to({rotation:2.0468,x:777.25,y:592.4},0).wait(1).to({rotation:2.0165,x:777.35,y:592.2},0).wait(1).to({rotation:1.9862,x:777.55,y:592.05},0).wait(1).to({rotation:1.9558,x:777.7,y:591.85},0).wait(1).to({rotation:1.9255,x:777.8,y:591.65},0).wait(1).to({rotation:1.8952,x:777.95,y:591.45},0).wait(1).to({rotation:1.8649,x:778.05,y:591.3},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:1.8345,x:778.2,y:591.1},0).wait(1).to({rotation:1.8042,x:778.4,y:590.85},0).wait(1).to({rotation:1.7739,x:778.5,y:590.7},0).wait(1).to({rotation:1.7436,x:778.65,y:590.55},0).wait(1).to({rotation:1.7132,x:778.8,y:590.35},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:1.6829,x:778.9,y:590.1},0).wait(1).to({rotation:1.6526,x:779.1,y:590},0).wait(1).to({rotation:1.6223,x:779.2,y:589.8},0).wait(1).to({rotation:1.5919,x:779.35,y:589.6},0).wait(1).to({rotation:1.5616,x:779.5,y:589.35},0).wait(1).to({rotation:1.5313,x:779.6,y:589.2},0).wait(1).to({rotation:1.501,x:779.75,y:589},0).wait(1).to({rotation:1.4707,x:779.9,y:588.8},0).wait(1).to({rotation:1.4403,x:780.1,y:588.65},0).wait(1).to({rotation:1.41,x:780.2,y:588.45},0).wait(1).to({rotation:1.3797,x:780.3,y:588.25},0).wait(1).to({rotation:1.3494,x:780.45,y:588.05},0).wait(1).to({rotation:1.319,x:780.55,y:587.85},0).wait(1).to({rotation:1.2887,x:780.75,y:587.65},0).wait(1).to({rotation:1.2584,x:780.9,y:587.45},0).wait(1).to({rotation:1.2281,x:781,y:587.3},0).wait(1).to({rotation:1.1977,x:781.15,y:587.1},0).wait(1).to({rotation:1.1674,x:781.3,y:586.9},0).wait(1).to({rotation:1.1371,x:781.45,y:586.75},0).wait(1).to({rotation:1.1068,x:781.55,y:586.5},0).wait(1).to({rotation:1.0764,x:781.7,y:586.3},0).wait(1).to({rotation:1.0461,x:781.85,y:586.15},0).wait(1).to({rotation:1.0158,x:782,y:586},0).wait(1).to({rotation:0.9855,x:782.15,y:585.75},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:0.9552,x:782.25,y:585.6},0).wait(1).to({rotation:0.9248,x:782.4,y:585.4},0).wait(1).to({rotation:0.8945,x:782.55,y:585.2},0).wait(1).to({rotation:0.8642,x:782.7,y:585},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:0.8339,x:782.8,y:584.8},0).wait(1).to({rotation:0.8035,x:782.95,y:584.6},0).wait(1).to({rotation:0.7732,x:783.05,y:584.45},0).wait(1).to({rotation:0.7429,x:783.25,y:584.2},0).wait(1).to({rotation:0.7126,x:783.4,y:584},0).wait(1).to({rotation:0.6822,x:783.5,y:583.9},0).wait(1).to({rotation:0.6519,x:783.65,y:583.7},0).wait(1).to({rotation:0.6216,x:783.75,y:583.45},0).wait(1).to({rotation:0.5913,x:783.95,y:583.3},0).wait(1).to({rotation:0.5609,x:784.05,y:583.1},0).wait(1).to({rotation:0.5306,x:784.2,y:582.85},0).wait(1).to({rotation:0.5003,x:784.3,y:582.7},0).wait(1).to({rotation:0.47,x:784.45,y:582.5},0).wait(1).to({rotation:0.4397,x:784.6,y:582.35},0).wait(1).to({rotation:0.4093,x:784.7,y:582.1},0).wait(1).to({rotation:0.379,x:784.85,y:581.9},0).wait(1).to({rotation:0.3487,x:784.95,y:581.75},0).wait(1).to({rotation:0.3184,x:785.15,y:581.55},0).wait(1).to({rotation:0.288,x:785.25,y:581.3},0).wait(1).to({rotation:0.2577,x:785.4,y:581.15},0).wait(1).to({rotation:0.2274,x:785.5,y:580.95},0).wait(1).to({rotation:0.1971,x:785.7,y:580.75},0).wait(1).to({rotation:0.1667,x:785.8,y:580.55},0).wait(1).to({rotation:0.1364,x:785.95,y:580.35},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:0.1061,x:786.05,y:580.2},0).wait(1).to({rotation:0.0758,x:786.2,y:580},0).wait(1).to({rotation:0.0454,x:786.35,y:579.75},0).wait(1).to({rotation:0.0151,x:786.5,y:579.6},0).wait(1).to({rotation:-0.0152,x:786.6,y:579.4},0).wait(1).to({rotation:-0.0455,x:786.7,y:579.25},0).wait(1).to({rotation:-0.0759,x:786.9,y:579},0).wait(1).to({rotation:-0.1062,x:787,y:578.8},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:-0.1365,x:787.15,y:578.65},0).wait(1).to({rotation:-0.1668,x:787.25,y:578.45},0).wait(1).to({rotation:-0.1971,x:787.4,y:578.25},0).wait(1).to({rotation:-0.2275,x:787.55,y:578.05},0).wait(1).to({rotation:-0.2578,x:787.7,y:577.85},0).wait(1).to({rotation:-0.2881,x:787.8,y:577.7},0).wait(1).to({rotation:-0.3184,x:787.95,y:577.45},0).wait(1).to({rotation:-0.3488,x:788.1,y:577.3},0).wait(1).to({rotation:-0.3791,x:788.25,y:577.1},0).wait(1).to({rotation:-0.4094,x:788.35,y:576.9},0).wait(1).to({rotation:-0.4397,x:788.5,y:576.7},0).wait(1).to({rotation:-0.4701,x:788.6,y:576.5},0).wait(1).to({rotation:-0.5004,x:788.8,y:576.35},0).wait(1).to({rotation:-0.5307,x:788.9,y:576.15},0).wait(1).to({rotation:-0.561,x:789.05,y:575.9},0).wait(1).to({rotation:-0.5914,x:789.2,y:575.75},0).wait(1).to({rotation:-0.6217,x:789.35,y:575.55},0).wait(1).to({rotation:-0.652,x:789.5,y:575.35},0).wait(1).to({rotation:-0.6823,x:789.6,y:575.15},0).wait(1).to({rotation:-0.7126,x:789.75,y:574.95},0).wait(1).to({rotation:-0.743,x:789.85,y:574.75},0).wait(1).to({rotation:-0.7733,x:790,y:574.5},0).wait(1).to({rotation:-0.8036,x:790.1,y:574.35},0).wait(1).to({rotation:-0.8339,x:790.25,y:574.15},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:-0.8643,x:790.35,y:574},0).wait(1).to({rotation:-0.8946,x:790.5,y:573.75},0).wait(1).to({rotation:-0.9249,x:790.65,y:573.6},0).wait(1).to({rotation:-0.9552,x:790.8,y:573.4},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:-0.9856,x:790.9,y:573.25},0).wait(1).to({rotation:-1.0159,x:791.05,y:573},0).wait(1).to({rotation:-1.0462,x:791.2,y:572.75},0).wait(1).to({rotation:-1.0765,x:791.3,y:572.6},0).wait(1).to({rotation:-1.1069,x:791.45,y:572.35},0).wait(1).to({rotation:-1.1372,x:791.55,y:572.2},0).wait(1).to({rotation:-1.1675,x:791.7,y:572},0).wait(1).to({rotation:-1.1978,x:791.85,y:571.85},0).wait(1).to({rotation:-1.2281,x:792,y:571.65},0).wait(1).to({rotation:-1.2585,x:792.1,y:571.4},0).wait(1).to({rotation:-1.2888,x:792.2,y:571.2},0).wait(1).to({rotation:-1.3191,x:792.35,y:571.05},0).wait(1).to({rotation:-1.3494,x:792.5,y:570.85},0).wait(1).to({rotation:-1.3798,x:792.65,y:570.65},0).wait(1).to({rotation:-1.4101,x:792.75,y:570.45},0).wait(1).to({rotation:-1.4404,x:792.9,y:570.3},0).wait(1).to({rotation:-1.4707,x:793.05,y:570},0).wait(1).to({rotation:-1.5011,x:793.15,y:569.8},0).wait(1).to({rotation:-1.5314,x:793.25,y:569.65},0).wait(1).to({rotation:-1.5617,x:793.4,y:569.45},0).wait(1).to({rotation:-1.592,x:793.6,y:569.25},0).wait(1).to({rotation:-1.6224,x:793.7,y:569.05},0).wait(1).to({rotation:-1.6527,x:793.85,y:568.9},0).wait(1).to({rotation:-1.683,x:793.9,y:568.65},0).wait(1).to({scaleX:1.0158,scaleY:1.0158,rotation:-1.7133,x:794.05,y:568.45},0).wait(1).to({rotation:-1.7437,x:794.2,y:568.25},0).wait(1).to({rotation:-1.774,x:794.35,y:568.1},0).wait(1).to({rotation:-1.8043,x:794.5,y:567.85},0).wait(1).to({rotation:-1.8346,x:794.55,y:567.65},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,rotation:-1.8649,x:794.75,y:567.45},0).wait(1).to({rotation:-1.8953,x:794.85,y:567.3},0).wait(1).to({rotation:-1.9256,x:795,y:567.05},0).wait(1).to({rotation:-1.9559,x:795.1,y:566.85},0).wait(1).to({rotation:-1.9862,x:795.2,y:566.65},0).wait(1).to({rotation:-2.0166,x:795.4,y:566.5},0).wait(1).to({rotation:-2.0469,x:795.5,y:566.3},0).wait(1).to({rotation:-2.0772,x:795.65,y:566.05},0).wait(91).to({regX:290.8,regY:327.5,scaleX:1.0158,scaleY:1.0158,rotation:-1.8361,x:490.45,y:325.3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_smail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// smail
	this.instance = new lib.sed();
	this.instance.setTransform(612.4,370.05,1,1,0,0,0,5,3.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AABAiIgBAAIAAAAIAAAAIAAAAIgBAAIAAAAIgBAAIgBAAIAAAAIgBAAIgBAAIAAAAIgBAAIgBAAIgBAAIAAAAIgCAAIgBgBIAAABIgBgBIgBABIgBgBIAAAAIgBgBIgBABIgBgBIAAABIgCgBIgBAAIAAAAIgBAAIgBgBIgBAAIAAAAIAAAAIgCgBIgBABIgBgBIgCAAIgBAAIgBgBIgBAAIgBAAIgBgBIAAAAIgBAAIgBAAIgCgBIAAABIgBgBIgBAAIgEgCIgBABIgFgDIABAAIACgBIAAAAIABAAIAAAAIABAAIABAAIAAAAIABAAIAAAAIABAAIABAAIAAgBIABABIAAgBIAAAAIABAAIAAAAIABABIAAgBIABAAIABAAIACgBIAAAAIABAAIABAAIABAAIAAAAIAAAAIABgBIAAAAIABAAIAAgBIAAABIABAAIAAgBIACAAIAAAAIAAAAIABgBIAAAAIABAAIAAAAIABgBIABAAIAAAAIABgBIAAAAIABAAIAAAAIABAAIAAgBIABAAIABAAIAAAAIABgBIAAAAIABAAIAAAAIABAAIAAAAIABgBIABgBIAAABIAAgBIABAAIAAAAIABAAIAAgBIACAAIAAgBIABAAIABgBIAAgBIABAAIAAgBIABAAIAAAAIABgBIAAAAIABAAIAAgBIABAAIABAAIAAgBIABAAIAAAAIABgBIAAAAIABAAIAAgBIABAAIAAAAIABgBIABAAIABAAIAAAAIAAAAIAAAAIACgBIAAgBIABABIAAgBIABAAIAAgBIABAAIABgBIAAAAIAAgBIABAAIABgCIABgBIAAAAIABgBIABAAIABgBIAAAAIABAAIAAgBIABgBIAAAAIABAAIAAgBIABAAIAAAAIABgBIABAAIABgBIABAAIABAAIAAgBIABAAIABAAIAAgBIAAAAIAAgBIABAAIAAAAIABAAIAAgBIABAAIAAgBIABAAIABgBIABAAIAAAAIABgBIAAAAIAAgBIABAAIABAAIAAgBIABgBIAAAAIABgBIAAAAIABgBIABAAIAAgBIACgBIAAAAIABAAIAAgBIABgBIAAgBIABAAIAAAAIABgBIAAAAIAAABIAAAAIAAABIABAAIgBABIABAAIgBAAIAAACIABABIgBAAIABABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAAAIAAABIAAABIAAAAIgBABIABABIgBABIAAACIAAAAIAAABIAAABIgBABIABABIgBABIAAABIgBACIAAABIgCACIAAABIgBACIAAABIgBABIAAABIAAABIgBACIAAABIgDAGIgBAAIAAABIgBAAIgBADIgBAAIgBAAIgBABIAAABIgBAAIAAAAIAAABIgBAAIgBABIgBAAIAAABIgBAAIgBABIAAAAIgBABIgBAAIAAABIgBgBIAAABIAAAAIgBABIAAAAIgBAAIAAABIgBgBIgCABIgBAAIAAABIgBAAIgBAAIAAAAIAAAAIgDAAIAAAAIAAABIgBgBIgBABIgBAAIAAgBIgBABIAAAAIAAAAIgCAAIAAAAIAAAAIgBAAIgBABIgBAAIgBgBIAAABIgBgBIAAABIgBAAg");
	this.shape.setTransform(611.2,369.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},62).to({state:[]},23).wait(516));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_pantsR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pantsR
	this.instance = new lib.legR_normal();
	this.instance.setTransform(714.6,504.1,0.9999,0.9999,-48.7177,0,0,-59.3,-107.7);

	this.instance_1 = new lib.pents_only();
	this.instance_1.setTransform(709.65,552.65,1,1,0,0,0,20.7,37.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(129).to({regX:-57.9,regY:-104.3,rotation:-48.7183,x:714.5,y:504.25},0).wait(1).to({regX:-54.8,regY:2.4,rotation:-46.446,x:793.95,y:575.6},0).wait(1).to({rotation:-44.1743,x:791,y:578.8},0).wait(1).to({rotation:-41.9026,x:788,y:581.9},0).wait(1).to({rotation:-39.6309,x:784.9,y:584.85},0).wait(1).to({rotation:-37.3592,x:781.65,y:587.65},0).wait(1).to({rotation:-35.0876,x:778.3,y:590.35},0).wait(1).to({rotation:-32.8159,x:774.85,y:592.95},0).wait(1).to({rotation:-30.5442,x:771.3,y:595.35},0).wait(1).to({rotation:-28.2725,x:767.75,y:597.65},0).wait(1).to({rotation:-26.0008,x:764,y:599.8},0).wait(1).to({rotation:-23.7291,x:760.2,y:601.8},0).wait(1).to({rotation:-22.3655,x:757.9,y:602.95},0).wait(1).to({rotation:-21.0019,x:755.55,y:604.1},0).wait(1).to({rotation:-19.6383,x:753.2,y:605.1},0).wait(1).to({rotation:-18.2747,x:750.8,y:606.2},0).wait(1).to({rotation:-16.9111,x:748.4,y:607.1},0).wait(1).to({rotation:-15.5475,x:746,y:608},0).wait(1).to({rotation:-14.1839,x:743.6,y:608.85},0).wait(1).to({rotation:-12.8203,x:741.15,y:609.6},0).wait(1).to({rotation:-11.4567,x:738.7,y:610.3},0).wait(1).to({rotation:-10.0931,x:736.15,y:610.95},0).wait(1).to({rotation:-8.7295,x:733.7,y:611.5},0).wait(1).to({rotation:-7.4835,x:731.4,y:612.05},0).wait(1).to({rotation:-6.2375,x:729.1,y:612.5},0).wait(1).to({rotation:-4.9915,x:726.8,y:612.9},0).wait(1).to({rotation:-3.7455,x:724.45,y:613.25},0).wait(1).to({rotation:-2.4995,x:722.2,y:613.55},0).wait(1).to({rotation:-1.2535,x:719.85,y:613.8},0).wait(5).to({_off:true},1).wait(381));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(163).to({_off:false},0).wait(12).to({regX:11.2,regY:-13,x:700.15,y:502.55},0).wait(1).to({regX:20.7,regY:39.6,rotation:-4.8656,x:714.05,y:554.1},0).wait(1).to({rotation:-9.7312,x:718.4,y:552.75},0).wait(1).to({rotation:-13.4809,x:721.65,y:551.4},0).wait(1).to({rotation:-17.2307,x:724.8,y:549.9},0).wait(1).to({rotation:-20.9804,x:727.85,y:548.2},0).wait(1).to({rotation:-24.7302,x:730.75,y:546.3},0).wait(1).to({rotation:-26.719,x:732.25,y:545.2},0).wait(1).to({rotation:-28.7077,x:733.7,y:544.1},0).wait(1).to({rotation:-30.6965,x:735.1,y:542.9},0).wait(5).to({regX:12.3,regY:-12.4,rotation:-30.2805,x:701.2,y:503.05},0).wait(51).to({regX:11.2,regY:-10.6,rotation:-30.2809,x:701.15},0).wait(1).to({regX:20.7,regY:39.6,rotation:-27.5974,x:732.85,y:543.1},0).wait(1).to({rotation:-24.9145,x:730.9,y:544.55},0).wait(1).to({rotation:-22.2315,x:728.95,y:545.85},0).wait(1).to({rotation:-19.5485,x:726.9,y:547.1},0).wait(1).to({rotation:-16.8655,x:724.8,y:548.3},0).wait(1).to({rotation:-14.1826,x:722.65,y:549.4},0).wait(1).to({rotation:-11.4996,x:720.5,y:550.3},0).wait(1).to({rotation:-8.8166,x:718.25,y:551.2},0).wait(1).to({rotation:-7.6529,x:717.25,y:551.5},0).wait(1).to({rotation:-6.4892,x:716.3,y:551.8},0).wait(1).to({rotation:-5.3255,x:715.3,y:552.15},0).wait(1).to({rotation:-4.1619,x:714.25,y:552.4},0).wait(1).to({rotation:-2.9982,x:713.25,y:552.65},0).wait(1).to({rotation:-1.8345,x:712.25,y:552.9},0).wait(5).to({regX:12.3,regY:-12.4,rotation:-0.2806,x:701.25,y:503.1},0).to({_off:true},121).wait(164));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_pantsL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pantsL
	this.instance = new lib.legL_normal();
	this.instance.setTransform(662.2,510.75,1,1,51.4082,0,0,-54.8,-103.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("Aiol0IF1AWIgjLTIl2gVg");
	this.shape.setTransform(653.175,555.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjMFgIAkrTIF1AUIgjLUg");
	this.shape_1.setTransform(653.175,555.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#3333CC").ss(12,1,1).p("Ah9mEIFwA/Ih1LKIlwg/g");
	this.shape_2.setTransform(646.425,553.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3333CC").s().p("AjyFGIB1rKIFwA/Ih1LKg");
	this.shape_3.setTransform(646.425,553.625);

	this.instance_1 = new lib.pents3();
	this.instance_1.setTransform(654.9,508.7,1,1,0,0,0,32.8,-6);
	this.instance_1._off = true;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#3333CC").ss(12,1,1).p("AC6lrIDZEyIpMGmIjZkyg");
	this.shape_4.setTransform(617.725,533.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3333CC").s().p("AmSA7IJMmnIDZEyIpMGmg");
	this.shape_5.setTransform(617.725,533.55);

	this.instance_2 = new lib.pents5();
	this.instance_2.setTransform(656.15,508.9,1,1,0,0,0,78.7,11.8);
	this.instance_2._off = true;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#3333CC").ss(12,1,1).p("AlODYIFfpoIE+C5IlgJng");
	this.shape_6.setTransform(638.475,545.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3333CC").s().p("AlODZIFfpoIE+C4IlgJog");
	this.shape_7.setTransform(638.475,545.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#3333CC").ss(12,1,1).p("AgUmYIFUCdIkrKUIlUicg");
	this.shape_8.setTransform(643.25,548.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3333CC").s().p("Ak/D9IEqqVIFUCdIkqKUg");
	this.shape_9.setTransform(643.25,548.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#3333CC").ss(12,1,1).p("AiulxIF2APIgZLUIl2gPg");
	this.shape_10.setTransform(655.425,555.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3333CC").s().p("AjHFjIAZrUIF2APIgZLUg");
	this.shape_11.setTransform(655.425,555.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},128).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},3).to({state:[{t:this.instance_1}]},131).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.instance_2}]},32).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},3).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[]},9).wait(164));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(128).to({regX:-53.8,regY:-102.7,scaleX:0.9999,scaleY:0.9999,rotation:51.409,x:662.25,y:510.7},0).wait(1).to({regX:-71.1,regY:2.8,scaleX:1,scaleY:1,rotation:49.0655,x:571.2,y:566.75},0).wait(1).to({rotation:46.7225,x:573.55,y:570.4},0).wait(1).to({rotation:44.3795,x:576.1,y:573.95},0).wait(1).to({rotation:42.0365,x:578.75,y:577.45},0).wait(1).to({rotation:39.6935,x:581.55,y:580.8},0).wait(1).to({rotation:37.3505,x:584.5,y:584.05},0).wait(1).to({rotation:35.0075,x:587.5,y:587.15},0).wait(1).to({rotation:32.6645,x:590.75,y:590.15},0).wait(1).to({rotation:30.6646,x:593.5,y:592.6},0).wait(1).to({rotation:28.6646,x:596.4,y:594.95},0).wait(1).to({rotation:26.6647,x:599.4,y:597.2},0).wait(1).to({rotation:24.6648,x:602.5,y:599.35},0).wait(1).to({rotation:22.6648,x:605.55,y:601.35},0).wait(1).to({rotation:20.6649,x:608.8,y:603.25},0).wait(1).to({rotation:18.6649,x:612.05,y:605.1},0).wait(1).to({rotation:16.665,x:615.4,y:606.8},0).wait(1).to({rotation:14.6651,x:618.75,y:608.35},0).wait(1).to({rotation:12.6651,x:622.2,y:609.8},0).wait(1).to({rotation:10.6652,x:625.7,y:611.15},0).wait(1).to({rotation:8.6653,x:629.2,y:612.35},0).wait(1).to({rotation:6.6653,x:632.8,y:613.5},0).wait(1).to({rotation:4.6654,x:636.35,y:614.4},0).wait(1).to({rotation:2.6655,x:640,y:615.3},0).wait(1).to({rotation:2.1326,x:640.95,y:615.45},0).wait(1).to({rotation:1.5998,x:641.95,y:615.65},0).wait(1).to({rotation:1.067,x:642.9,y:615.85},0).wait(1).to({rotation:0.5341,x:643.85,y:616.05},0).wait(1).to({rotation:0.0013,x:644.85,y:616.2},0).wait(1).to({rotation:-0.5315,x:645.9,y:616.35},0).wait(5).to({_off:true},1).wait(381));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(297).to({_off:false},0).wait(1).to({regX:24.3,regY:38.9,rotation:3.3439,x:643.8,y:553},0).wait(1).to({rotation:6.6877,x:641.2,y:552.3},0).wait(1).to({rotation:10.0316,x:638.65,y:551.4},0).wait(1).to({rotation:11.739,x:637.45,y:550.95},0).wait(1).to({rotation:13.4463,x:636.15,y:550.4},0).wait(1).to({rotation:15.1537,x:634.95,y:549.8},0).wait(1).to({rotation:16.8611,x:633.7,y:549.2},0).wait(1).to({rotation:18.5684,x:632.5,y:548.5},0).wait(1).to({rotation:20.2758,x:631.3,y:547.85},0).wait(1).to({rotation:22.2648,x:630,y:547},0).wait(1).to({rotation:24.2539,x:628.65,y:546.1},0).wait(1).to({rotation:26.2429,x:627.4,y:545.2},0).wait(1).to({rotation:28.232,x:626.1,y:544.2},0).wait(1).to({rotation:30.221,x:624.9,y:543.2},0).wait(1).to({rotation:31.5766,x:624.1,y:542.45},0).wait(1).to({rotation:32.9322,x:623.3,y:541.7},0).wait(1).to({rotation:34.2878,x:622.55,y:541},0).wait(1).to({rotation:35.6434,x:621.8,y:540.2},0).wait(1).to({rotation:36.999,x:621.05,y:539.35},0).wait(1).to({rotation:38.3546,x:620.3,y:538.6},0).wait(1).to({rotation:39.7102,x:619.65,y:537.75},0).wait(3).to({_off:true},1).wait(222));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(354).to({_off:false},0).wait(1).to({regX:40.3,regY:36.5,rotation:-2.6682,x:618.9,y:535.3},0).wait(1).to({rotation:-5.3364,x:620.15,y:537.05},0).wait(1).to({rotation:-8.0047,x:621.55,y:538.7},0).wait(1).to({rotation:-10.6729,x:622.95,y:540.25},0).wait(1).to({rotation:-12.232,x:623.85,y:541.1},0).wait(1).to({rotation:-13.7911,x:624.75,y:542},0).wait(1).to({rotation:-15.3502,x:625.6,y:542.85},0).wait(1).to({rotation:-16.9093,x:626.55,y:543.65},0).wait(1).to({rotation:-18.965,x:627.8,y:544.7},0).wait(1).to({rotation:-21.0206,x:629.15,y:545.65},0).wait(1).to({rotation:-23.0763,x:630.5,y:546.65},0).wait(1).to({rotation:-25.132,x:631.85,y:547.55},0).to({_off:true},1).wait(177));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_kneeR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// kneeR
	this.instance = new lib.legshoe();
	this.instance.setTransform(711.2,624.55,1,1,3.2077,0,0,9.3,4.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(12).to({regX:8.5,regY:3.1,rotation:3.2068,x:711.25,y:624.5},0).wait(1).to({regX:29.9,regY:45.5,rotation:8.6952,x:735.2,y:669.6},0).wait(1).to({rotation:14.1826,x:740.1,y:670.85},0).wait(1).to({rotation:12.5075,x:750,y:667.5},0).wait(1).to({rotation:10.8324,x:759.8,y:664.15},0).wait(1).to({rotation:9.1573,x:769.65,y:660.75},0).wait(1).to({rotation:7.4822,x:779.5,y:657.3},0).wait(1).to({rotation:5.8071,x:783.95,y:653.95},0).wait(1).to({rotation:4.132,x:788.35,y:650.65},0).wait(1).to({rotation:2.4569,x:792.85,y:647.3},0).wait(1).to({rotation:0.7903,x:794.1,y:646.7},0).wait(1).to({rotation:-0.8763,x:795.35,y:646.1},0).wait(1).to({rotation:-2.5429,x:796.5,y:645.4},0).wait(1).to({rotation:-4.2095,x:797.75,y:644.75},0).wait(1).to({rotation:-5.8761,x:798.9,y:644},0).wait(1).to({rotation:-7.5427,x:800.05,y:643.25},0).wait(1).to({rotation:-9.2093,x:801.2,y:642.4},0).wait(1).to({rotation:-10.8759,x:802.3,y:641.6},0).wait(1).to({rotation:-12.5425,x:803.4,y:640.7},0).wait(1).to({rotation:-14.6888,x:804.7,y:639.55},0).wait(1).to({rotation:-16.8352,x:806.05,y:638.4},0).wait(1).to({rotation:-18.9815,x:807.25,y:637.1},0).wait(1).to({rotation:-21.1278,x:808.5,y:635.8},0).wait(1).to({rotation:-23.2741,x:809.7,y:634.5},0).wait(1).to({rotation:-25.4205,x:810.8,y:633.1},0).wait(1).to({rotation:-27.5668,x:811.85,y:631.7},0).wait(1).to({rotation:-26.8114,x:811.5,y:632.15},0).wait(1).to({rotation:-26.056,x:811.1,y:632.65},0).wait(1).to({rotation:-25.3007,x:810.75,y:633.2},0).wait(1).to({rotation:-24.5453,x:810.35,y:633.7},0).wait(1).to({rotation:-23.7899,x:809.95,y:634.2},0).wait(4).to({regX:9.2,regY:4.5,scaleX:0.9999,scaleY:0.9999,rotation:-36.2332,x:772.75,y:603.1},0).wait(2).to({regX:7.8,regY:3.9,rotation:-36.233,x:772.8,y:602.9},0).wait(1).to({regX:29.9,regY:45.5,rotation:-27.2331,x:811.45,y:629.7},0).wait(1).to({rotation:-18.2332,x:806.8,y:635.45},0).wait(1).to({scaleX:1,scaleY:1,rotation:-9.2334,x:801.25,y:640.35},0).wait(1).to({rotation:-0.2336,x:795.05,y:644.4},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:8.7663,x:788.25,y:647.3},0).wait(1).to({rotation:16.2656,x:782.35,y:649},0).wait(1).to({rotation:23.7649,x:776.2,y:649.85},0).wait(1).to({rotation:31.2643,x:770.1,y:649.9},0).wait(1).to({rotation:38.7636,x:763.95,y:649.15},0).wait(1).to({rotation:41.7634,x:761.55,y:648.6},0).wait(1).to({rotation:44.7632,x:759.2,y:647.95},0).wait(1).to({rotation:47.7629,x:756.8,y:647.2},0).wait(1).to({rotation:50.7627,x:754.5,y:646.3},0).wait(1).to({rotation:53.7625,x:752.25,y:645.25},0).wait(3).to({regX:9.3,regY:4.5,rotation:68.7675,x:772.75,y:603},0).wait(12).to({regX:7.5,regY:2.4,x:772.9,y:602.95},0).wait(1).to({regX:29.9,regY:45.5,rotation:63.6744,x:739,y:644.1},0).wait(1).to({rotation:58.5816,x:737.45,y:648.35},0).wait(1).to({rotation:53.4889,x:736.15,y:652.35},0).wait(1).to({rotation:48.3961,x:734.95,y:656},0).wait(1).to({rotation:43.3034,x:733.85,y:659.3},0).wait(1).to({rotation:39.5996,x:732.65,y:661.1},0).wait(1).to({rotation:35.8959,x:731.45,y:662.75},0).wait(1).to({rotation:32.1921,x:730.25,y:664.2},0).wait(1).to({rotation:28.4883,x:729.15,y:665.4},0).wait(1).to({rotation:24.7846,x:728.05,y:666.4},0).wait(1).to({rotation:21.0808,x:726.85,y:667.2},0).wait(1).to({x:725.35},0).wait(1).to({x:723.85},0).wait(1).to({x:722.3},0).wait(2).to({regX:9.4,regY:4.5,rotation:7.5043,x:717.95,y:624.5},0).wait(3).to({rotation:7.5043,x:712.55},0).to({_off:true},121).wait(185));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_kneeL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// kneeL
	this.instance = new lib.legshoe();
	this.instance.setTransform(649.2,621.7,1,1,0,-5.2187,174.7813,9,-0.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(1).to({regX:29.9,regY:45.5,skewX:-10.2183,skewY:169.7817,x:630.7,y:668.5},0).wait(1).to({skewX:-15.2178,skewY:164.7822,x:629.1,y:666.85},0).wait(1).to({skewX:-20.2173,skewY:159.7827,x:627.45,y:664.9},0).wait(1).to({skewX:-17.3632,skewY:162.6368,x:624.95,y:664.65},0).wait(1).to({skewX:-14.5092,skewY:165.4908,x:622.45,y:664.25},0).wait(2).to({regX:28.1,regY:-7.9,skewX:-6.4616,skewY:173.5384,x:614.15,y:616.1},0).wait(127).to({regX:7.5,regY:2.3,skewX:-6.4581,skewY:173.5419,x:630.4,y:623.85},0).wait(1).to({regX:29.9,regY:45.5,skewX:-4.4889,skewY:175.5111,x:607.5,y:668.05},0).wait(1).to({skewX:-2.5183,skewY:177.4817,x:602.05,y:666.75},0).wait(1).to({skewX:-0.5477,skewY:179.4523,x:596.6,y:665.45},0).wait(1).to({skewX:1.423,skewY:181.423,x:591.85,y:663.2},0).wait(1).to({skewX:3.3936,skewY:183.3936,x:587.15,y:660.95},0).wait(1).to({skewX:5.3642,skewY:185.3642,x:582.5,y:658.65},0).wait(1).to({skewX:7.3348,skewY:187.3348,x:577.85,y:656.3},0).wait(1).to({skewX:9.3055,skewY:189.3055,x:573.25,y:653.85},0).wait(1).to({skewX:11.2761,skewY:191.2761,x:568.7,y:651.4},0).wait(1).to({skewX:13.626,skewY:193.626,x:563.55,y:647.3},0).wait(1).to({skewX:15.9759,skewY:195.9759,x:558.4,y:643.15},0).wait(1).to({skewX:18.3258,skewY:198.3258,x:553.35,y:638.95},0).wait(1).to({skewX:20.6757,skewY:200.6757,x:548.4,y:634.65},0).wait(1).to({skewX:23.0256,skewY:203.0256,x:543.45,y:630.3},0).wait(1).to({skewX:24.3764,skewY:204.3764,x:540.4,y:628.05},0).wait(1).to({skewX:25.7272,skewY:205.7272,x:537.45,y:625.8},0).wait(1).to({skewX:27.078,skewY:207.078,x:534.55,y:623.5},0).wait(1).to({skewX:28.4289,skewY:208.4289,x:531.6,y:621.15},0).wait(1).to({skewX:29.7797,skewY:209.7797,x:528.65,y:618.9},0).wait(1).to({skewX:31.1305,skewY:211.1305,x:525.8,y:616.55},0).wait(1).to({skewX:32.4813,skewY:212.4813,x:522.95,y:614.2},0).wait(1).to({skewX:37.3435,skewY:217.3435,x:521.05,y:610.5},0).wait(1).to({skewX:42.2056,skewY:222.2056,x:519.4,y:606.75},0).wait(2).to({regX:12.1,regY:-5,scaleX:0.9999,scaleY:0.9999,skewX:38.937,skewY:218.937,x:558.4,y:567.9},0).wait(1).to({regX:29.9,regY:45.5,skewX:43.581,skewY:223.581,x:510.85,y:592.9},0).wait(1).to({skewX:48.225,skewY:228.225,x:509.2,y:589.65},0).wait(1).to({skewX:52.8691,skewY:232.8691,x:507.9,y:586.3},0).wait(1).to({skewX:57.5131,skewY:237.5131,x:506.9,y:582.9},0).wait(1).to({skewX:62.1571,skewY:242.1571,x:506.25,y:579.3},0).wait(1).to({skewX:53.1569,skewY:233.1569,x:506.95,y:586.6},0).wait(1).to({skewX:44.1568,skewY:224.1568,x:508.95,y:593.5},0).wait(1).to({skewX:35.1566,skewY:215.1566,x:512.1,y:599.8},0).wait(1).to({skewX:26.1565,skewY:206.1565,x:516.3,y:605.3},0).wait(1).to({skewX:17.1563,skewY:197.1563,x:521.5,y:609.95},0).wait(3).to({regX:11.5,regY:-2,skewX:5.2235,skewY:185.2235,x:553.9,y:568.35},0).wait(1).to({regX:29.9,regY:45.5,skewX:-0.0156,skewY:179.9844,x:535.45,y:615.85},0).wait(1).to({skewX:-5.2552,skewY:174.7448,x:539.9,y:617.3},0).wait(1).to({skewX:-10.4949,skewY:169.5051,x:544.45,y:618.4},0).wait(1).to({skewX:-15.7345,skewY:164.2655,x:549,y:619.05},0).wait(1).to({scaleX:1,scaleY:1,skewX:-20.9742,skewY:159.0258,x:553.7,y:619.3},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,skewX:-17.1824,skewY:162.8176,x:550.35,y:619.15},0).wait(1).to({skewX:-13.3907,skewY:166.6093,x:546.95,y:618.75},0).wait(1).to({skewX:-9.5989,skewY:170.4011,x:543.65,y:618.25},0).wait(1).to({scaleX:1,scaleY:1,skewX:-5.8072,skewY:174.1928,x:540.35,y:617.4},0).wait(1).to({skewX:-2.0154,skewY:177.9846,x:537.1,y:616.45},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,skewX:1.7763,skewY:181.7763,x:534,y:615.25},0).wait(1).to({scaleX:1,scaleY:1,skewX:5.5681,skewY:185.5681,x:530.95,y:613.85},0).wait(4).to({regX:14.1,regY:-5.1,scaleX:0.9999,scaleY:0.9999,skewX:5.2245,skewY:185.2245,x:553.95,y:568.35},0).wait(3).to({regX:7.6,regY:0.1,x:557.6,y:574.3},0).wait(1).to({regX:29.9,regY:45.5,skewX:1.4751,skewY:181.4751,x:538.1,y:620.75},0).wait(1).to({skewX:-2.2748,skewY:177.7252,x:545.05,y:623.75},0).wait(1).to({skewX:-6.0246,skewY:173.9754,x:552.05,y:626.6},0).wait(1).to({skewX:-9.7745,skewY:170.2255,x:559.2,y:629.25},0).wait(1).to({skewX:-6.9079,skewY:173.0921,x:559.8,y:631.7},0).wait(1).to({skewX:-4.0412,skewY:175.9588,x:560.55,y:634.15},0).wait(1).to({skewX:-1.1746,skewY:178.8254,x:561.25,y:636.45},0).wait(1).to({skewX:1.6921,skewY:181.6921,x:562,y:638.6},0).wait(1).to({skewX:2.3096,skewY:182.3096,x:565.4,y:639.7},0).wait(1).to({skewX:2.9271,skewY:182.9271,x:568.8,y:640.8},0).wait(1).to({skewX:3.5445,skewY:183.5445,x:572.2,y:641.9},0).wait(1).to({skewX:4.162,skewY:184.162,x:575.6,y:643.05},0).wait(1).to({skewX:1.4236,skewY:181.4236,x:582.3,y:646.15},0).wait(1).to({skewX:-1.3149,skewY:178.6851,x:589.2,y:649.2},0).wait(1).to({skewX:-4.0533,skewY:175.9467,x:596.1,y:652.1},0).wait(2).to({regX:14.1,regY:-5,skewX:-5.2167,skewY:174.7833,x:647.4,y:614.75},0).to({_off:true},9).wait(188));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_handR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// handR
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AjtktQAQgNAWAEQAWADAOATIGWIEQAOASgBAWQgCAWgQANQgQAMgWgDQgWgEgOgTImWoDQgOgTABgWQACgWAQgMg");
	this.shape.setTransform(754.0999,428.0426);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("ADIE4QgWgEgOgTImWoDQgOgTABgWQACgWAQgMQAQgNAWAEQAWADAOATIGVIEQAPASgBAWQgCAWgQANQgNAJgQAAIgJAAg");
	this.shape_1.setTransform(754.0999,428.0426);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC99").s().p("AgIAmQgMgDgIgJQgJgKgBgMQgBgLAGgLQAGgLALgGQALgFAMADQAMACAJAIQAIAJACAMQADAMgGALQgGAMgMAGQgJAEgIAAIgIgBg");
	this.shape_2.setTransform(765.425,442.2583);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgRAiQgLgFgGgLQgGgMADgLQABgMAKgJQAIgJAMgDQALgCAMAGQALAFAGAKQAGALgBAMQgBAMgIAJQgJALgOACIgHABQgJAAgIgFg");
	this.shape_3.setTransform(753.0759,450.2081);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(12,1,1).p("AiXlgQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgUAIgUgJQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHg");
	this.shape_4.setTransform(740.9682,435.1721,1,1,7.7063);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC99").s().p("ABwFhQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgKAEgJAAQgKAAgLgFg");
	this.shape_5.setTransform(740.9682,435.1721,1,1,7.7063);

	this.instance = new lib.arm20();
	this.instance.setTransform(743.6,434.45,1,1,0,0,0,16.1,36.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{rotation:0,x:754.0999,y:428.0426}},{t:this.shape,p:{rotation:0,x:754.0999,y:428.0426}}]}).to({state:[{t:this.shape_3},{t:this.shape_1,p:{rotation:14.9992,x:745.8263,y:433.5722}},{t:this.shape,p:{rotation:14.9992,x:745.8263,y:433.5722}}]},135).to({state:[{t:this.shape_5,p:{rotation:7.7063,x:740.9682,y:435.1721}},{t:this.shape_4,p:{rotation:7.7063,x:740.9682,y:435.1721}}]},5).to({state:[{t:this.instance}]},44).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_5,p:{rotation:6.9703,x:741.4601,y:435.1271}},{t:this.shape_4,p:{rotation:6.9703,x:741.4601,y:435.1271}}]},1).to({state:[{t:this.shape_5,p:{rotation:10.4077,x:739.1909,y:435.6727}},{t:this.shape_4,p:{rotation:10.4077,x:739.1909,y:435.6727}}]},52).to({state:[]},137).wait(188));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(184).to({_off:false},0).wait(1).to({regX:16.2,rotation:1.3137,x:743.65,y:434.4},0).wait(1).to({rotation:2.6274,x:743.7},0).wait(1).to({rotation:3.9411,x:743.65},0).wait(3).to({_off:true},1).wait(377));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_handL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// handL
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(579.7753,484.3576,1,1,7.7133);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(598.9377,462.2742,1,1,7.7133);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(579.7753,484.3576,1,1,7.7133);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(598.9377,462.2742,1,1,7.7133);

	this.instance = new lib.arm19();
	this.instance.setTransform(611.25,437.4,1,1,0,0,0,27.6,4.6);
	this.instance._off = true;

	this.instance_1 = new lib.arm16();
	this.instance_1.setTransform(606.85,434.05);

	this.instance_2 = new lib.arm8();
	this.instance_2.setTransform(614.7,432.85,1,1,0,0,0,29.6,0);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3,p:{y:462.2742,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:484.3576,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:462.2742,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape,p:{y:484.3576,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}}]}).to({state:[{t:this.shape_3,p:{y:463.2242,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:485.3076,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:463.2242,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape,p:{y:485.3076,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}}]},130).to({state:[{t:this.shape_3,p:{y:463.2232,rotation:-7.2857,x:598.9809,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:489.5132,rotation:-7.2857,x:586.1868,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:463.2232,rotation:-7.2857,x:598.9809,scaleX:1,scaleY:1}},{t:this.shape,p:{y:489.5132,rotation:-7.2857,x:586.1868,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.shape_3,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.shape_3,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.shape_3,p:{y:464.9184,rotation:-14.564,x:602.224,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:492.6164,rotation:-14.564,x:592.864,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:464.9184,rotation:-14.564,x:602.224,scaleX:1,scaleY:1}},{t:this.shape,p:{y:492.6164,rotation:-14.564,x:592.864,scaleX:1,scaleY:1}}]},31).to({state:[{t:this.shape_3,p:{y:463.3016,rotation:-7.3213,x:599.1744,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:489.5983,rotation:-7.3213,x:586.3973,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:463.3016,rotation:-7.3213,x:599.1744,scaleX:1,scaleY:1}},{t:this.shape,p:{y:489.5983,rotation:-7.3213,x:586.3973,scaleX:1,scaleY:1}}]},2).to({state:[{t:this.instance}]},76).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_3,p:{y:467.2695,rotation:-33.8174,x:611.1895,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{y:496.5038,rotation:-33.8174,x:611.4862,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{y:467.2695,rotation:-33.8174,x:611.1895,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{y:496.5038,rotation:-33.8174,x:611.4862,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:0,rotation:0,x:606.85,y:434.05}}]},5).to({state:[{t:this.instance_1,p:{regX:3.7,regY:33.1,rotation:9.2157,x:605.2,y:467.3}}]},1).to({state:[{t:this.shape_3,p:{y:463.6575,rotation:-8.8301,x:599.8717,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{y:490.2801,rotation:-8.8301,x:587.7921,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{y:463.6575,rotation:-8.8301,x:599.8717,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{y:490.2801,rotation:-8.8301,x:587.7921,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_2}]},82).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_3,p:{y:467.1434,rotation:-31.2874,x:610.0451,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{y:496.3613,rotation:-31.2874,x:609.0511,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{y:467.1434,rotation:-31.2874,x:610.0451,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{y:496.3613,rotation:-31.2874,x:609.0511,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[]},9).wait(188));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(254).to({_off:false},0).wait(1).to({regX:15.5,regY:30.5,rotation:-4.9996,x:601.45,y:464.25},0).wait(1).to({rotation:-9.9993,x:603.8,y:465},0).wait(1).to({rotation:-14.9989,x:606.2,y:465.5},0).wait(1).to({rotation:-17.056,x:607.25,y:465.65},0).wait(1).to({rotation:-19.1132,x:608.3,y:465.75},0).wait(1).to({rotation:-21.1703,x:609.25,y:465.9},0).wait(1).to({rotation:-23.2275,x:610.35,y:465.95},0).wait(2).to({_off:true},1).wait(304));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(353).to({_off:false},0).wait(1).to({regX:14.8,regY:30.8,rotation:-1.2186,x:600.55,y:463.95},0).wait(1).to({rotation:-2.4372,x:601.2,y:464.2},0).wait(1).to({rotation:-3.6557,x:601.85,y:464.5},0).wait(1).to({rotation:-4.8743,x:602.55,y:464.8},0).wait(1).to({rotation:-6.0929,x:603.2,y:465.05},0).wait(1).to({rotation:-7.3115,x:603.9,y:465.25},0).wait(1).to({rotation:-8.53,x:604.6,y:465.45},0).wait(1).to({rotation:-9.7486,x:605.3,y:465.7},0).wait(1).to({rotation:-10.9672,x:606,y:465.9},0).wait(1).to({rotation:-12.5894,x:606.95,y:466.1},0).wait(1).to({rotation:-14.2115,x:607.9,y:466.3},0).wait(1).to({rotation:-15.8337,x:608.85,y:466.5},0).wait(1).to({rotation:-17.4559,x:609.8,y:466.65},0).wait(4).to({_off:true},1).wait(197));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_fingersLEFT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fingersLEFT
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAJgdQACACABACQAKALABAOQABANgMAMQgDADgFADQgCAAgCAAQgLAAgIgJQgJgJAAgNQAAgLAJgKQAIgJALAAQAFAAAEABQACABABABQAFACAEAEQAIAKAAALQAAANgIAJQgEAEgFADQgEABgEAB");
	this.shape.setTransform(551.025,445.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAZAzQgEAAg/AQQgvALgYgRQgJgGgHgKQgWgnAagjQAGgIAGgHQAWgaAZgQQAhgUAvgBQAbgBAWAGQAMAEALAFQAEACAEADQAQAJAIAMABwgGQgEAEgHAEAAXAbQADgOAKgKQALgKAQgCQADgBADAAQAJAAAIADQAIADAHAGQABAAATACQATACAAAUQAAAQgTAXQgEAEgFAFQgBACgCACQgLALgMAHQgRAJgSACQgiAEgGgQQgGgQAUgcAAXAbQAYAVgWADQgCgHAAgIQAAgFAAgEg");
	this.shape_1.setTransform(540.1708,449.7053);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AADAfQgLAAgIgJQgJgJAAgNQAAgLAJgKQAIgJALAAQAFAAAEABIADAEQAKALABAOQABANgMAMIgIAGIgEAAg");
	this.shape_2.setTransform(550.7288,445.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AALBfQgGgQAUgcQALgCAAgFQAAgGgNgLQANALAAAGQAAAFgLACQgCgHAAgIIAAgJIAAAJQAAAIACAHQgEAAg/AQQgvALgYgRQgJgGgHgKQgWgnAagjIAMgPQAWgaAZgQQAhgUAvgBQAbgBAWAGQAMAEALAFIAIAFQAQAJAIAMQgEgCgFAAQgMAAgJAJQgJAKAAANQAAAMAJAJQAJAKAMAAIADAAIgLAIQgHgGgIgDQgIgDgJAAIgGABQgQACgLAKQgKAKgDAOQADgOAKgKQALgKAQgCIAGgBQAJAAAIADQAIADAHAGIAUACQATACAAAUQAAAQgTAXIgJAJIgDAEQgLALgMAHQgRAJgSACIgMABQgXAAgFgNgAAZAzIAAAAg");
	this.shape_3.setTransform(540.1708,449.7053);

	this.instance = new lib.hand2L();
	this.instance.setTransform(548.3,447.9,1,1,75.004,0,0,9.3,1.6);
	this.instance._off = true;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(1,1,1).p("AAshVQABAAALgPQALgQARAJQAPAJAKAcQABAFACAHQABACABADQAEAPAAANQgBATgHARQgOAegQgCQgRgDgPggQgHgBgHgDQgEgDgDgCQAegKgJATQgCAEgSA/QgNAvgaANQgKAEgMABQgtAAgSgqQgEgIgDgIQgMghgBgeQgBgmAXgqQANgXAQgQQAJgJALgGQADgDAFgDQAQgIAOgCAAqhjQACAGAAAIAAbgFQgLgKgEgNQgEgPAHgPQABgCABgDQAFgIAGgFQAHgGAJgD");
	this.shape_4.setTransform(547.2995,459);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#996600").ss(1,1,1).p("AgUgWQABgBACAAQADgDAGgCQAMgCALAGQALAGADAMQACAGAAAEQgBAEgBAFAgUgWQACAAACAAQAPgDANAGQAMAGAEAPQAAAFABAGQgBABgBACQgGAKgNADQgLADgLgGQgLgGgEgNQgDgLAGgKQADgFADgDg");
	this.shape_5.setTransform(548.575,447.7363);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AhgBeIgHgRQgMgggBgeQgBgmAXgqQANgXAQgQQAJgIALgHIAIgFQAQgJAOgCIgGAIQgGAKADAMQAEANALAGQAKAHAMgEQANgDAGgKIACgDQACAGAAAIQgJADgHAGQgGAFgFAHIgCAGQgFAJAAAJIACALQAEAPALAJQgLgJgEgPIgCgLQAAgJAFgJIACgGQAFgHAGgFQAHgGAJgDIAMgQQALgPARAKQAPAIAKAcIADAMIACAEQAEAQAAAOQgBASgHARQgOAfgQgDQgRgDgPggQAGgMgMAAIAAgBIgCABIgKACIgDABIAHAFQAHADAHABQgCADgSBAQgNAugaANQgKAFgMABQgtAAgSgqgAAwAEQgHgBgHgDIgHgFIADgBIAKgCIACgBIAAABQAMAAgGAMIAAAAg");
	this.shape_6.setTransform(547.2995,459);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#996600").s().p("AgNAXQgLgGgEgNQgDgLAGgKIAGgIIAEAAQAPgDANAGQAMAGAEAQIABAKIgCADQgGAKgNADIgIABQgHAAgHgEg");
	this.shape_7.setTransform(548.475,448.0139);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#996600").ss(1,1,1).p("AAdANQgBABgBACQgGAKgNADQgLADgLgGQgLgGgEgNQgDgLAGgKQADgFADgDQACAAACAAQAPgDANAGQAMAGAEAPQAAAFABAGgAgUgWQABgBACAAQADgDAGgCQAMgCALAGQALAGADAMQACAGAAAEQgBAEgBAF");
	this.shape_8.setTransform(536.925,463.9363);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFCC99").ss(1,1,1).p("AAwAEQgCAEgSA/QgNAvgaANQgKAEgMABQgtAAgSgqQgEgIgDgIQgMghgBgeQgBgmAXgqQANgXAQgQQAJgIALgHQADgDAFgDQAQgIAOgCAAshVQABAAALgPQALgQARAJQAPAJAKAcQABAFACAHQABACABADQAEAPAAANQgBATgHARQgOAfgQgDQgRgCgPghQgHgBgHgDQgEgCgDgDQAegKgJATAAqhjQACAGAAAIAAbgFQgLgKgEgNQgEgPAHgPQABgCABgDQAFgIAGgFQAHgGAJgD");
	this.shape_9.setTransform(535.6495,475.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFCC99").s().p("AhgBeIgHgRQgMgggBgeQgBgmAXgqQANgXAQgQQAJgIALgHIAIgFQAQgJAOgCIgGAIQgGAKADAMQAEANALAGQAKAHAMgEQANgDAGgKIACgDQACAGAAAIQgJADgHAGQgGAFgFAHIgCAGQgFAJAAAJIACALQAEAPALAJQgLgJgEgPIgCgLQAAgJAFgJIACgGQAFgHAGgFQAHgGAJgDIAMgQQALgPARAKQAPAIAKAcIADAMIACAEQAEAQAAAOQgBASgHARQgOAfgQgDQgRgDgPggQAGgMgMAAIAAAAIgCAAIgKACIgDABIAHAFQAHADAHABQgHgBgHgDIgHgFIADgBIAKgCIACAAIAAAAQAMAAgGAMQgCADgSBAQgNAugaAOQgKAEgMABQgtAAgSgqg");
	this.shape_10.setTransform(535.6495,475.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#996600").ss(1,1,1).p("AAZAUQgBABgBABQgJAIgNAAQgMAAgJgJQgJgIAAgNQAAgNAJgIQADgDAEgDQABAAACAAQAEgCAGAAQAMABAJAJQAJAIAAALQAAAHgBAFQgCAEgCAEgAgNgbQACAAACABQAOABAMAKQAKAIAAARQgBAEgBAG");
	this.shape_11.setTransform(553.275,481.9015);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFCC99").ss(1,1,1).p("AAsAWQgDACghA5QgYApgeAGQgLACgMgDQgrgLgHgtQgBgKgBgIQgDgiAHgdQAJgmAhgiQATgTATgMQALgFAMgEQAEgCAFgBQARgEAOACAAaAGQgIgLAAgOQAAgQAKgMQACgCACgDQAHgGAHgDQAIgEAKAAQAAAAAPgMQAPgNAOAOQAMAMACAeQAAAGAAAGQABACAAADQAAAPgEANQgFASgMAPQgVAagPgGQgQgHgGgjABBhQQAAAHgBAIAAaAGQAggCgOASQgGgDgGgGQgDgEgDgDg");
	this.shape_12.setTransform(549.2776,491.9637);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#996600").s().p("AADAdQgMAAgJgJQgJgIAAgNQgBgNAKgIIAHgGIAEABQANABAMAKQAKAIAAARIgCAKIgBACQgJAIgLAAIgCAAg");
	this.shape_13.setTransform(553.1,482.0265);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFCC99").s().p("AhFB/QgrgLgHgtIgCgSQgDgiAHgdQAJgmAhgiQATgTATgMQALgFAMgEIAJgDQARgEAOACIgHAGQgJAIAAAMQAAAOAJAJQAJAJANgBQANABAJgIIACgDQAAAHgBAIQgKAAgIAEQgHADgHAGIgEAFQgKAMAAAOIAAACIAAACQAAANAIAKQgIgKAAgNIAAgCIAAgCQAAgOAKgMIAEgFQAHgGAHgDQAIgEAKAAIAPgMQAPgNAOAOQAMAMACAeIAAAMIABAFQAAAPgEANQgFASgMAPQgVAagPgGQgQgHgGgjQAMgQgXAAIAAAAIAAAAIgHAAIAHAAIAAAAIAAAAQAXAAgMAQQgGgDgGgGIgGgHIAGAHQAGAGAGADQgDACghA5QgYApgeAGIgKABIgNgCgAAsAWIAAAAgAAsAWIAAAAg");
	this.shape_14.setTransform(549.2776,491.9637);

	this.instance_1 = new lib.arm18();
	this.instance_1.setTransform(608.55,542.05,1,1,0,0,0,20.5,1.2);
	this.instance_1._off = true;

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FFCC99").ss(1,1,1).p("Ag0hIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAQABAAACABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACQABACA0ApQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCQgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKQgBgFAAgGQgCgRADgOAANgYQACghAQARQgEAFgHAFQgDACgEAEQgNAFgOgCQgPgCgLgMQgBgBgCgEQgFgHgEgHQgCgIACgKAhDhMQAHABAIAD");
	this.shape_15.setTransform(618.5409,552.3402);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#996600").ss(1,1,1).p("AgdALQAAgBABgDQgCgFABgFQADgMAKgHQALgHAKABQAGAAAFADQADABAEAEQABAAACADQAGAJgCALQgCANgKAIQgJAHgNgBQgMgCgHgJQgDgFgDgDQABgDABgBQADgNAMgLQAKgJAQACQAEACAFAC");
	this.shape_16.setTransform(609.4431,546.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFCC99").s().p("AAnB+QgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKIgBgLQgCgRADgOIAGAIQAHAJAMACQAOABAJgHQAKgHACgNQACgMgGgJIgDgEQAHABAIADIgBAIIABAKIAJAOIADAFQALAMAPACIAEAAIAFAAQAJAAAJgDQAEgEADgCQAHgFAEgFIgBAAIAAgBIgBAAIAAAAQgEgEgDgBIgBAAIAAAAQgHAAgBAWQgJADgJAAIgFAAIgEAAQgPgCgLgMIgDgFIgJgOIgBgKIABgIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAIADABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACIA1ArQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCgAANgYIAAAAgAAVguIAAAAIABAAQADABAEAEIAAAAIABAAIAAABIABAAQgEAFgHAFQgDACgEAEQABgWAHAAg");
	this.shape_17.setTransform(618.5409,552.3402);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#996600").s().p("AgEAbQgNgCgHgJIgFgIIACgEQADgMALgMQAKgIARACIAJADIACAEQAHAJgDALQgCANgKAHQgHAGgLAAIgDAAg");
	this.shape_18.setTransform(609.4597,547.0122);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#996600").ss(1,1,1).p("AgdALQAAgBABgDQgCgFABgFQADgMAKgHQALgHAKABQAGAAAFADQADABAEAEAgdALQABgDABgBQADgNAMgLQAKgJAQACQAEACAFACQABAAACADQAGAJgCALQgCANgKAIQgJAHgNgBQgMgCgHgJQgDgFgDgDg");
	this.shape_19.setTransform(602.9431,551.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#FFCC99").ss(1,1,1).p("Ag0hIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAQABAAACABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACQABACA0ApQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCQgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKQgBgFAAgGQgCgRADgOAhDhMQAHABAIADAANgYQgNAFgOgCQgPgCgLgMQgBgBgCgEQgFgHgEgHQgCgIACgKAANgYQACghAQARQgEAFgHAFQgDACgEAEg");
	this.shape_20.setTransform(612.0409,556.5902);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#996600").s().p("AgEAbQgNgCgHgJIgFgIIACgEQADgMALgMQAKgIARACIAJADIACAEQAHAJgDALQgCANgKAHQgHAHgLAAIgDgBg");
	this.shape_21.setTransform(602.9597,551.2622);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFCC99").s().p("AAnB+QgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKIgBgLQgCgRADgOIAGAIQAHAJAMACQAOABAJgHQAKgHACgNQACgMgGgJIgDgEQAHABAIADIgBAIIABAKIAJAOIADAFQALAMAPACIAFAAIADAAIABAAIAAAAQAJAAAIgDIAAAAIABAAIgBAAIAAAAQgIADgJAAIAAAAIgBAAIgDAAIgFAAQgPgCgLgMIgDgFIgJgOIgBgKIABgIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAIADABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACIA1ArQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCgAANgYQAEgEADgCQAHgFAEgFIgBAAIAAgBIgBAAQgDgEgDgBIgCAAIAAAAQgHAAgBAWIAAAAgAANgYIAAAAgAAVguIAAAAIACAAQADABADAEIABAAIAAABIABAAQgEAFgHAFQgDACgEAEQABgWAHAAg");
	this.shape_22.setTransform(612.0409,556.5902);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#FFCC99").ss(1,1,1).p("Ag0hIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAQABAAACABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgiACQAzgqgUAEQgYAEgoATQgoATgCgEQgFgHgEgHQgCgIACgKgAAfgnQAGAFAvAlQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCQgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKQgBgFAAgGQgCgRADgOAAfgnQABgBAAAAQgBAAAAAAgAAfgoQgEAFgHAFQgDACgEAEQAKgIAIgHAhDhMQAHABAIADAANgYQACghAQAR");
	this.shape_23.setTransform(616.2909,553.5902);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFCC99").s().p("AAnB+QgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKIgBgLQgCgRADgOIAGAIQAHAJAMACQAOABAJgHQAKgHACgNQACgMgGgJIgDgEQAHABAIADIgBAIIABAKIAJAOIABABIAAAAQAFAAAWgKIAAAAIAFgCIABAAIAAgBIABAAIAEgCIACgBIABAAQAogTAYgEIAAAAIAAAAIACgBIAAAAIAAAAQANAAgpAjIgCACIgDACIADgCIACgCQApgjgNAAIAAAAIAAAAIgCABIAAAAIAAAAQgYAEgoATIgBAAIgCABIgEACIgBAAIAAABIgBAAIgFACIAAAAQgWAKgFAAIAAAAIgBgBIgJgOIgBgKIABgIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAIADABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgiACIgBAAIAAABIA1AqQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCgAANgYIASgPIgSAPQAEgEADgCQAHgFAEgFIgBAAIAAgBIgBAAIAAAAQgEgEgDgBIgBAAIAAAAQgHAAgBAWIAAAAgAANgYIAAAAgAAVguIAAAAIABAAQADABAEAEIAAAAIABAAIAAABIABAAQgEAFgHAFQgDACgEAEQABgWAHAAg");
	this.shape_24.setTransform(616.2909,553.5902);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#FFCC99").ss(1,1,1).p("AAvgiQAEAHAjAwQAeAmgHAeQgCALgIAKQgcAigsgKQgJgDgHgDQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMQABgFABgFQADgRAGgNAgZhXQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABQACABACACQAPAFALAIQAOAMAIARQARAegMALQgMALghgGQA7gcgUgCQgZgBgsAIQgrAHgBgEQgDgIgBgIQAAgIAEgJgAgmhfQAGACAHAGAAvgiIAAAAQABABABgBQgBAAgBAAQgDACgEABQgDACgDABQgEACgEACQAKgfALAVgAAogfQAEgBADgC");
	this.shape_25.setTransform(625.0637,548.0289);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#996600").ss(1,1,1).p("AAcgOQABAAABAEQAEAKgGAKQgFAMgMAFQgKAEgMgEQgMgFgEgLQgCgFgBgEQAAgBACgBQgBgGACgFQAGgLAMgFQALgDALADQAFADAEADQADACADAFgAgeACQABgCACgBQAGgMAOgIQALgGAQAHQADADAFAD");
	this.shape_26.setTransform(618.3342,539.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#996600").s().p("AgLAZQgMgFgEgLIgDgJIADgDQAGgMAOgIQALgGAQAHIAIAGQAAAAABAAQAAAAAAABQAAAAAAABQABABAAABQAEAKgGAKQgFAMgMAFQgFACgGAAQgEAAgHgCg");
	this.shape_27.setTransform(618.3342,540.1935);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFCC99").s().p("AAbCGIgQgGQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMIACgKQADgRAGgNIAEAJQAEALAMAFQANAFAKgFQALgFAGgMQAFgLgEgKQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAQAGACAHAGQgEAJAAAIQABAIADAIQABABAFAAIAAAAIADAAIACAAIADAAIAHgBIADAAIANgCIABAAIAAAAIADgBIACAAIABAAIAGgBIABAAIAJgCIACAAIABAAIAegEIAFAAIAEAAIADAAIAAAAIAEAAIADAAIABAAQAFABAAACQAAAGgsAVQAsgVAAgGQAAgCgFgBIgBAAIgDAAIgEAAIAAAAIgDAAIgEAAIgFAAIgeAEIgBAAIgCAAIgJACIgBAAIgGABIgBAAIgCAAIgDABIAAAAIgBAAIgNACIgDAAIgHABIgDAAIgCAAIgDAAIAAAAQgFAAgBgBQgDgIgBgIQAAgIAEgJQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABIAEADQAPAFALAIQAOAMAIARQARAegMALQgMALghgGIgCAAIAAAAIAnA3QAeAmgHAeQgCALgIAKQgWAageAAQgJAAgLgCgAAagYIAIgEIAGgDIAHgDIgHADIgGADIgIAEQAGgSAGgBIAAAAIAAAAQAFAAAEAJIgHADIAHgDQgEgJgFAAIAAAAIAAAAQgGABgGASIAAAAg");
	this.shape_28.setTransform(625.0637,548.0289);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FFCC99").ss(1,1,1).p("AgZhXQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABQACABACACQAPAFALAIQAOAMAIARQARAegMALQgMALghgGQA7gcgUgCQgZgBgsAIQgrAHgBgEQgDgIgBgIQAAgIAEgJgAgmhfQAGACAHAGAAvgiQAEAHAjAwQAeAmgHAeQgCALgIAKQgcAigsgKQgJgDgHgDQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMQABgFABgFQADgRAGgNAApgfIgBABQgDABgDABQgEACgEACQAKgfALAVQgDABgDACQADgBADgCQABABABgBQgBAAgBAAIAAAA");
	this.shape_29.setTransform(629.3137,542.2789);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#996600").ss(1,1,1).p("AgeACQAAgBACgBQgBgGACgFQAGgLAMgFQALgDALADQAFADAEADQADACADAFAgeACQABgCACgBQAGgMAOgIQALgGAQAHQADADAFADQABAAABAEQAEAKgGAKQgFAMgMAFQgKAEgMgEQgMgFgEgLQgCgFgBgEg");
	this.shape_30.setTransform(622.5842,534.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFCC99").s().p("AAbCGIgQgGQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMIACgKQADgRAGgNIAEAJQAEALAMAFQANAFAKgFQALgFAGgMQAFgLgEgKQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAQAGACAHAGQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABIAEADQAPAFALAIQAOAMAIARQARAegMALQgMALghgGQAsgVAAgGQAAgCgFgBIgIAAIAAAAIgCAAQgQAAgXADIgRADIgDABIgBAAIgCAAIgCABIgBAAIgEAAIAAAAIgNACIAAAAIgFABIgDAAIgBAAIgDAAIgDAAIAAAAQgFAAgBgBQgDgIgBgIQAAgIAEgJQgEAJAAAIQABAIADAIQABABAFAAIAAAAIADAAIADAAIABAAIADAAIAFgBIAAAAIANgCIAAAAIAEAAIABAAIACgBIACAAIABAAIADgBIARgDQAXgDAQAAIACAAIAAAAIAIAAQAFABAAACQAAAGgsAVIgCAAIAAAAIAnA3QAeAmgHAeQgCALgIAKQgWAageAAQgJAAgLgCgAAagYIAIgEIAGgCIABgBIAGgDIgGADIgBABIgGACIgIAEIABgCIAAgBQAGgPAFgBIAAAAIABAAQAEABAEAIIgGADIAGgDQgEgIgEgBIgBAAIAAAAQgFABgGAPIAAABIgBACIAAAAg");
	this.shape_31.setTransform(629.3137,542.2789);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#FFCC99").ss(1,1,1).p("AgFhhQABgBgBgUQAAgTARgCQASgCAZAQQAEAFAGADQACABABADQANAIAJALQALAPADATQAIAhgOAIQgPAHgegOQBBgMgUgHQgYgIgsgEQgrgEAAgEQgBgJABgHQACgIAGgIgAAzgaQADAHAUA3QATAtgOAbQgFAKgLAIQgkAagmgWQgIgEgGgGQgegSgSgXQgZgggGgvQgEgZADgYQACgLAFgLQACgFACgEQAHgQAKgLAgPhsQAFAEAFAHAAugZQACgBADAAQABAAABAAQgBgBgBAAIAAABAAugZIgBAAIgCAAQgCABgEAAQgFAAgEABQASgbAFAXQgDABgCABg");
	this.shape_32.setTransform(625.9663,543.8603);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#996600").ss(1,1,1).p("AgegFQAAgBACgCQABgFAEgFQAIgJAMgBQANAAAJAGQAEAEADADQACADADAGAgegFQABgCADgBQAJgKAPgEQAMgDAOALQACAEAFAEQAAABAAADQABAKgIAJQgIAKgNACQgJACgMgIQgKgIgBgMQgBgEAAgEg");
	this.shape_33.setTransform(621.2766,533.72);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#996600").s().p("AgSAUQgKgIgBgLIgBgJIAEgCQAJgKAPgFQAMgCAOAKQACAEAFAEIAAAFQABAJgIAJQgIAKgNACIgDAAQgJAAgJgGg");
	this.shape_34.setTransform(621.2766,533.996);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFCC99").s().p("AgLCCQgIgEgGgGQgegSgSgXQgZgggGgvQgEgZADgYQACgLAFgLIAEgJQAHgQAKgLIABAKQABALAKAIQAMAIAKgCQANgCAIgKQAIgJgBgKIAAgFQAFAEAFAHQABgBgBgUQAAgTARgCQASgCAZAQQAEAFAGADQACABABADQANAIAJALQALAPADATQAIAhgOAIQgPAHgegOQAygJAAgGQAAgCgFgCQgYgIgsgEQgrgEAAgEIgBgIIABgIQACgIAGgIQgGAIgCAIIgBAIIABAIQAAAEArAEQAsAEAYAIQAFACAAACQAAAGgyAJIgCgBIAAABIAXA+QATAtgOAbQgFAKgLAIQgTAOgVAAQgRAAgRgKgAAcgXIAJgBIAGgBIACAAIABAAIAFgBIgFABIAFgCIgBgBQgCgJgEAAIAAAAIgBAAQgFAAgIAMIgCACIAAAAIAAAAgAAcgXIAAAAIACgCQAIgMAFAAIABAAIAAAAQAEAAACAJIABABIgFACIgBAAIgCAAIgGABIgJABIAAAAgAAugZIAAAAg");
	this.shape_35.setTransform(625.9663,543.8603);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#996600").ss(1,1,1).p("AgXgTQAAgBADAAQADgFAGgCQALgDALAFQAMAGAEAKQACAGABADQABADgBAHAgXgTQACgBADAAQAMgEAPAEQAMAEAHAQQAAAEACAGQAAABgCADQgFAJgLAEQgMAFgLgFQgKgDgGgNQgFgLAFgLQACgEACgEg");
	this.shape_36.setTransform(619.9583,533.1404);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#FFCC99").ss(1,1,1).p("AAwgBQgCAGgKA7QgGAwgZARQgJAGgOACQgsAEgXgmQgEgIgDgJQgQgegFgdQgFgnARgsQALgYAOgTQAIgJAIgHQAFgEAEgDQAOgKAOgEAAihbQABgBAIgRQAKgRARAHQAQAIAOAaQACAGADAFQABACAAADQAGAOADAOQACATgHARQgJAggQAAQgRgBgTgaQA+AUgOgPQgQgSgkgZQglgaACgEQAEgIAFgGQAFgGAKgDgAAehqQADAGABAJAAqgDIAAAAIgBAAIgBgBQgCgBgEgCQgEgCgFgBQAegPgIAXQgCAAgDgBQADABADABQAAAAABABQgBgCgBAAIABAB");
	this.shape_37.setTransform(619.9828,544.794);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#996600").s().p("AgLAYQgKgEgGgMQgFgMAFgKIAEgJIAFAAQANgEAOAEQANAEAHAQQgBAEACAFIgBAFQgFAJgLAEQgHACgGAAQgFAAgGgCg");
	this.shape_38.setTransform(619.925,533.4625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFCC99").s().p("AhVBnQgEgIgDgJQgQgegFgdQgFgnARgsQALgYAOgTQAIgJAIgHIAJgHQAOgKAOgEIgEAJQgFAKAFANQAGAMAKAEQALAEAMgEQALgEAFgJIACgFQADAGABAJQgKADgFAGQgFAGgEAIIAAABQAAAEAjAZQAkAZAQASIABABQAEAFgGAAIAAAAIgBAAIgBAAIgLgCIAAAAIgMgDIAAAAIgIgDIgLgDIgBAAIgBAAIgBAAIABAAIABAAIABAAIALADIAIADIAAAAIAMADIAAAAIALACIABAAIABAAIAAAAQAGAAgEgFIgBgBQgQgSgkgZQgjgZAAgEIAAgBQAEgIAFgGQAFgGAKgDQABgBAIgRQAKgRARAHQAQAIAOAaQACAGADAFQABACAAADQAGAOADAOQACATgHARQgJAggQAAQgRgBgTgaIgCgCIABgCQAEgMgJAAIAAAAIgCAAQgFABgIADIAAAAIgBABIAAAAIgBAAIAAAAIgBABIAJADIAGADIABABIABAAIAAAAIAAAAIgBAAIgBgBIgGgDIgJgDIABgBIAAAAIABAAIAAAAIABgBIAAAAQAIgDAFgBIACAAIAAAAQAJAAgEAMIgBACIgFgBIAGACIgMBBQgGAwgZARQgJAGgOACIgIAAQgmAAgVgigAAqgDIAFABIABABIgGgCgAAvgCg");
	this.shape_39.setTransform(619.9828,544.794);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#FFCC99").ss(1,1,1).p("AAsAQQgDAGgZA3QgSAsgcAKQgLAEgOgDQgrgHgNgqQgCgKAAgIQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEQAFgDAFgCQAQgGAOAAAA2hKQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfQA3AlgKgTQgLgWgcghQgcgiADgEQAFgGAGgFQAHgEAKgBgAAoANIAAAAIgBAAIAAgBIgBgBQgCgCgDgDQgEgDgEgCQAhgFgOATIAAABQAAAAABABQAAgCgBAAQgCgBgCgBQACABACACAA2hZQACAHgCAI");
	this.shape_40.setTransform(617.2716,543.1271);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#996600").ss(1,1,1).p("AgRgZQABgBADABQAEgEAGAAQAMAAAJAHQAKAKACAKQAAAFgBAFQAAADgDAGAgRgZQACAAADABQAMgBAOAIQALAHADARQgCAEAAAGQAAABgCADQgHAHgMABQgMACgLgIQgIgGgDgOQgBgMAHgJQAEgDACgEg");
	this.shape_41.setTransform(620.0208,532.4109);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFCC99").s().p("Ag3CEQgrgHgNgqIgCgSQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEIAKgFQAQgGAOAAIgGAHQgHAJACANQABAOAJAGQALAIANgCQALgBAIgHIACgEQACAHgCAIQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfIAFADIAAAAIACABIAAAAIABABIABAAIACACIABAAQAXAQAIABIAAAAIACAAIAAAAQADAAgCgFIAAAAIgBgBIAAAAQgLgWgcghQgagfAAgGIABgBQAFgGAGgFQAHgEAKgBQgKABgHAEQgGAFgFAGIgBABQAAAGAaAfQAcAhALAWIAAAAIABABIAAAAQACAFgDAAIAAAAIgCAAIAAAAQgIgBgXgQIgBAAIgCgCIgBAAIgBgBIAAAAIgCgBIAAAAIgFgDIgBgCIAAgBIABAAIAAgBQAJgNgPAAIgBAAIAAAAIgMABIgBAAIAIAFIAFAFIABABIAAABIABAAIAAAAIAAAAIgBAAIAAgBIgBgBIgFgFIgIgFIABAAIAMgBIAAAAIABAAQAPAAgJANIAAABIgBAAIAAABIgEgCIAEADIgcA9QgSAsgcAKQgGACgIAAIgLgBgAAsAQIgEgDIAEACIAAABIAAAAg");
	this.shape_42.setTransform(617.2716,543.1271);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#996600").s().p("AgRAWQgIgGgDgOQgBgMAHgKIAGgHIAFABQAMAAAOAIQALAHADARQgCADAAAGIgCAFQgHAHgMABIgEAAQgKAAgJgGg");
	this.shape_43.setTransform(619.9375,532.5875);

	this.instance_2 = new lib.arm12();
	this.instance_2.setTransform(617.25,529.45,1,1,0,0,0,12,0);
	this.instance_2._off = true;

	this.instance_3 = new lib.arm9();
	this.instance_3.setTransform(610.95,554.1,1,1,0,0,0,6.9,3.6);
	this.instance_3._off = true;

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#996600").ss(1,1,1).p("AAegCQABABAAACQgCALgIAHQgJAKgNABQgKAAgLgKQgIgJAAgLQABgFgBgEQAAgBACgBQACgGAEgEQAKgIAMABQANABAIAHQAEAEACAFQACACABAHgAgegJQACgBADgCQAKgIAPgBQAMgCAOAMQAAAEAEAF");
	this.shape_44.setTransform(610.15,554.0497);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#FFCC99").ss(1,1,1).p("AAzgWQABAHANA6QANAugQAaQgHAKgMAGQgnAVgigaQgIgGgGgGQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKQACgEADgFQAJgPALgJAADhjQABgBABgVQACgSASAAQATABAXATQAEAFAFADQABABABAEQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQBCgFgTgIQgWgLgsgKQgqgJABgFQAAgJACgHQADgHAGgHgAgGhvQAGAEADAIAAvgVIgBAAIgBAAIAAAAIgCAAQgDgBgEAAQgGAAgDABQAWgaABAZQgCAAgBABQABgBADAAQAAABABAAQgBgBgBAAIABAA");
	this.shape_45.setTransform(613.8019,564.9242);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#996600").s().p("AgWARQgIgJgBgMQABgEgBgFIAGgCQAKgJAPgBQAMgCAOANQABAEADAEIABAFQgCAJgIAIQgJAJgNABIgBAAQgKAAgKgJg");
	this.shape_46.setTransform(610.15,554.3874);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFCC99").s().p("AgeB+IgOgMQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKIAFgJQAJgPALgJQABAEgBAFQAAAMAJAJQAKAKAKAAQAOgBAJgKQAIgHADgLIgCgEQAGAEADAIIACgWQACgSASAAQATABAXATQAEAFAFADIACAFQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQA0gEgBgGQAAgBgEgCQgWgLgsgKQgpgJAAgFIAAAAIACgQQADgHAGgHQgGAHgDAHIgCAQIAAAAQAAAFApAJQAsAKAWALQAEACAAABQABAGg0AEIgCgBIABAAIgEABIADgBQAAgMgFAAIgBAAIAAAAQgFAAgIAIIgBABIgBACIgBABIgBABIAJgBIAHABIACAAIAAAAIABAAIABAAIAEgBIAOBBQANAugQAaQgHAKgMAGQgRAJgRAAQgUAAgTgOgAAvgVIAAAAgAAugVIgBAAIAAAAIgCAAIgHgBIgJABIABgBIABgBIABgCIABgBQAIgIAFAAIAAAAIABAAQAFAAAAAMIgDABg");
	this.shape_47.setTransform(613.8019,564.9242);

	this.instance_4 = new lib.arm14();
	this.instance_4.setTransform(613.8,564.9,1,1,0,0,0,10.8,14);

	this.instance_5 = new lib.arm5();
	this.instance_5.setTransform(566.95,549.2,1,1,0,0,0,3.9,3.2);
	this.instance_5._off = true;

	this.instance_6 = new lib._2();
	this.instance_6.setTransform(572,552.2,1,1,0,0,0,5.8,7.9);
	this.instance_6._off = true;

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#996600").ss(1,1,1).p("AgegKQACgBACAAQAKgJAQgCQAMgBANANQACADADAFQAAAAABAAQABABAAADQgCAKgJAIQgJAJgNABQgKAAgKgKQgJgJAAgLQAAgEgBgFQABgBAAAAQABAAABgBQACgHAFgDQAKgIALAAQANACAIAHQAEAFACAEQACADABAG");
	this.shape_48.setTransform(581.675,555.2747);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgRASgBQATABAXATQADAFAGAEQAAABACADQALAKAHALQAJAQABAUQAFAhgPAIQgQAEgdgRQBDgEgTgJQgXgLgrgKQgqgKAAgDQAAgKACgGQAEgIAFgIgAAwgVQAAgBADABQACAHANA5QANAtgRAbQgGAJgMAGQgnAWgjgaQgIgHgFgFQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIQABgFADgGQAJgOALgJAAwgVIAAAAIgBAAIgBgBIgBABIgBAAQgEgBgEAAQgFABgEAAQAXgaABAZQgDAAAAABgAAzgWIAAABQAAAAABAAQgBgBAAAAgAgFhvQAFADADAI");
	this.shape_49.setTransform(585.336,566.1969);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#996600").s().p("AgVARQgJgKAAgLIgBgJIABAAIAEgCQAKgIAQgCQAMgBANAMIAFAIIABABQAAAAAAAAQAAABAAAAQABABAAABQAAAAAAABQgCAKgJAHQgJAJgNABIgBAAQgKAAgJgJg");
	this.shape_50.setTransform(581.675,555.6225);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIIAEgLQAJgOALgJIAAAJQAAAMAKAJQAJAKAKAAQAOgBAKgJQAIgIACgKQAAgBAAgBQAAgBAAgBQAAAAAAgBQgBAAAAAAQAFADADAIQgFAIgEAIQgCAGAAAKIAAAAQAAADAqAKQArAKAXALQAEACAAABQAAAGg0AEIgBgBQgBgMgFAAIgBAAIgBAAQgEABgHAHIgBAAIAAABIgBAAIgBABIAAABIgCACIAJgBIAIABIABAAIABgBIABABIABAAIAAAAIAAAAIADgBIAAABIgCgBIAAAAIgBABIABgBIAAAAIACABIAPBAQANAtgRAbQgGAJgMAGQgSAKgSAAQgTAAgTgOgAA0gVQA0gEAAgGQAAgBgEgCQgXgLgrgKQgqgKAAgDIAAAAQAAgKACgGQAEgIAFgIQABAAABgVQADgRASgBQATABAXATQADAFAGAEIACAEQALAKAHALQAJAQABAUQAFAhgPAIIgHABQgOAAgYgOgAAvgVIgBgBIgBABIgBAAIgIgBIgJABIACgCIAAgBIABgBIABAAIAAgBIABAAQAHgHAEgBIABAAIABAAQAFAAABAMIgDABIAAAAIAAAAgAAwgVIAAAAg");
	this.shape_51.setTransform(585.336,566.1969);

	this.instance_7 = new lib.arm11();
	this.instance_7.setTransform(585.3,551.7,1,1,0,0,0,10.8,-0.5);
	this.instance_7._off = true;

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#996600").ss(1,1,1).p("AADgeQABAAABABQAGAAAFAEQALAIACALQACANgFAJQgDAFgEADQgCADgFADAADgeQABABABACQALAIAGAOQAEALgIARQgDACgDAFIgBAAIAAAAQAAABgEABQgJABgKgGQgLgHgFgNQgDgJAHgLQAHgMAMgDQADgBAEgCQABAAAAABQAAAAAAAAg");
	this.shape_52.setTransform(566.0738,540.7821);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#FFCC99").ss(1,1,1).p("AAfA0QgHAEgzAbQgpAZgegKQgKgDgJgKQgfggAPgqQAFgJADgFQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEQAGAAAGABQAQAFAMAIAAfA1QAVBAAEgVQAEgZgBgsQgCgrADgBQALgCAFAAQAJACAJAEQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGQgBABgDACQgHAOgJAKQgNANgSAFQgfAOgMgNQgIgOAJghQABgBgBAAIAAAAQAAABAAAAgAAeAyIAAAAIAAgCIAAAAIgBgBIAAgCQAAgEgBgEQgCgEgCgDQAgAOgZAIQAAgCgBAAQABAAAAACABngYQgCAGgHAF");
	this.shape_53.setTransform(556.929,546.3689);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#996600").s().p("AgJAbQgLgHgFgNQgDgJAHgLQAHgMAMgDIAHgDIABABIAAAAIACADQALAIAGAOQAEALgIARQgDACgDAFIgBAAIAAAAIgEACIgDAAQgIAAgIgFg");
	this.shape_54.setTransform(565.769,540.7821);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFCC99").s().p("AAeBkQgIgOAJghQAAAAABAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQALgDAAgFQAAgGgSgIIAEAHIABAIIAAACIABABIAAAAIAAACIAAAAIAAAAIAAgCIAAAAIgBgBIAAgCIgBgIIgEgHQASAIAAAGQAAAFgLADIgBgCIAAAAIAAAAIAAAAIAAAAIABABIAAABIg6AfQgpAZgegKQgKgDgJgKQgfggAPgqIAIgOQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEIAMABQAQAFAMAIIgJADQgMADgGAMQgHALADAKQAEANALAHQAKAGALgBIAEgBQgCAGgHAFQgJgEgJgCQgFAAgLACQgCABAAASIABAZIAAAXQAAAcgDASIAAABIAAAAQAAABAAABQgBABAAAAQAAABgBAAQAAAAgBAAIAAAAIgBAAIAAAAIgBgBIAAAAIgBgBQgFgGgIgYIgBgBIgCgGIgBgDIgBgDIgBgDIABADIABADIABADIACAGIABABQAIAYAFAGIABABIAAAAIABABIAAAAIABAAIAAAAQABAAAAAAQABAAAAgBQAAAAABgBQAAgBAAgBIAAAAIAAgBQADgSAAgcIAAgXIgBgZQAAgSACgBQALgCAFAAQAJACAJAEQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGIgEADQgHAOgJAKQgNANgSAFQgQAHgLAAQgKAAgGgGgAAfA0IAAgBIgBgBIAAAAIAAAAIAAAAIAAAAIABACgAAeAyIAAAAg");
	this.shape_55.setTransform(556.929,546.3689);

	this.instance_8 = new lib.arm6();
	this.instance_8.setTransform(568.75,538.25,1,1,0,0,0,25.7,2.5);
	this.instance_8._off = true;

	this.instance_9 = new lib.arm4();
	this.instance_9.setTransform(616.75,554,1,1,0,0,0,9,-3.2);
	this.instance_9._off = true;

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#996600").ss(1,1,1).p("AgdgKQAAAAABgBQACgGAFgEQAKgIALAAQANACAIAHQAEAFACAEQACADABAGAgdgKQABgBACAAQALgIAPgDQAMAAAOAMQABADADAFIABAAIAAAAQABABAAADQgCAKgIAIQgKAJgNABQgKAAgJgKQgKgJAAgLQAAgEgBgFQABgBAAAAg");
	this.shape_56.setTransform(614.925,560.2747);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgSARAAQAUABAXATQADAFAGADQAAABABADQAMALAHALQAJAQABATQAFAigQAIQgQAEgcgSQBCgEgSgJQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIgAAygWQADAIAMA5QANAtgQAaQgHAJgLAHQgnAWgjgaQgIgHgFgFQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIQACgGADgGQAJgOAKgJAgFhvQAFADADAIAAwgWIAAABIgCgBIAAAAIgBABIgCgBQgDgBgEAAQgGABgDABQAWgbABAaQgBAAgBAAQABAAABAAQABABABgBQgBgBgBABIAAAA");
	this.shape_57.setTransform(618.6095,571.2042);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#996600").s().p("AgUARQgKgJAAgMIgBgJIABAAIABAAIADgCQALgIAPgCQAMgBAOAMQABAEADAEIABABIAAAAIABAEQgCAKgIAIQgKAIgNABIgBAAQgKAAgIgJg");
	this.shape_58.setTransform(614.925,560.6252);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIIAFgMQAJgOAKgJIABAJQAAANAKAJQAJAKAKgBQAOgBAKgIQAIgIACgLIgBgEQAFADADAIQABAAABgVQADgSARAAQAUABAXATQADAFAGADIABAEQAMALAHALQAJAQABATQAFAigQAIQgQAEgcgSQA0gDAAgGQAAgCgEgCQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIQgFAIgEAIQgCAFAAALQAAADApAKQArAKAYAKQAEACAAACQAAAGg0ADQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAQAAgMgFAAIgBAAIAAAAQgFAAgIAJIAAABIgBABIAAAAIgDACIAJgCIAHABIACABIABgBIAAAAIACABIAAgBIAAABIgCgBIAAAAIgBABIgCgBIgHgBIgJACIADgCIAAAAIABgBIAAgBQAIgJAFAAIAAAAIABAAQAFAAAAAMIgCAAIACAAQADAIAMA5QANAtgQAaQgHAJgLAHQgSAKgRAAQgUAAgTgOgAAwgWIACAAIAAAAIgCAAg");
	this.shape_59.setTransform(618.6095,571.2042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},61).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_7,p:{x:548.475,y:448.0139}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_10},{t:this.shape_7,p:{x:536.825,y:464.2139}},{t:this.shape_9},{t:this.shape_8}]},14).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},5).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_22},{t:this.shape_21,p:{x:602.9597,y:551.2622}},{t:this.shape_20},{t:this.shape_19,p:{x:602.9431,y:551.05}}]},19).to({state:[{t:this.shape_24},{t:this.shape_21,p:{x:607.2097,y:548.2622}},{t:this.shape_23},{t:this.shape_19,p:{x:607.1931,y:548.05}}]},2).to({state:[{t:this.shape_28},{t:this.shape_27,p:{x:618.3342,y:540.1935}},{t:this.shape_26},{t:this.shape_25}]},2).to({state:[{t:this.shape_31},{t:this.shape_27,p:{x:622.5842,y:534.4435}},{t:this.shape_30},{t:this.shape_29}]},2).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32}]},2).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]},2).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40}]},2).to({state:[{t:this.instance_2}]},66).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44}]},1).to({state:[{t:this.instance_4,p:{rotation:0,x:613.8,y:564.9}}]},1).to({state:[{t:this.instance_4,p:{rotation:14.9996,x:607.8,y:564.85}}]},1).to({state:[{t:this.instance_4,p:{rotation:29.9992,x:585.25,y:564.85}}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.instance_7}]},21).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.instance_8}]},31).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56}]},1).to({state:[]},3).wait(191));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(61).to({_off:false},0).wait(1).to({regX:11.2,regY:14.2,rotation:80.6276,x:536.15,y:451.8},0).wait(1).to({rotation:86.2525,x:535.9,y:450.65},0).wait(1).to({rotation:91.8774,x:535.65,y:449.35},0).wait(1).to({rotation:97.5024,x:535.55,y:448.1},0).wait(1).to({rotation:103.1273,x:535.6,y:446.85},0).wait(1).to({rotation:108.7522,x:535.75,y:445.6},0).wait(1).to({rotation:114.3771,x:536.05,y:444.4},0).wait(1).to({rotation:120.002,x:536.45,y:443.2},0).wait(1).to({rotation:122.1448,x:536.7,y:442.75},0).wait(1).to({rotation:124.2876,x:536.85,y:442.3},0).wait(1).to({rotation:126.4304,x:537.1,y:441.85},0).wait(1).to({rotation:128.5731,x:537.3,y:441.45},0).wait(1).to({rotation:130.7159,x:537.55,y:441.1},0).wait(1).to({rotation:132.8587,x:537.85,y:440.65},0).wait(1).to({rotation:135.0015,x:538.1,y:440.25},0).wait(1).to({rotation:137.1443,x:538.4,y:439.9},0).wait(1).to({rotation:139.2871,x:538.7,y:439.55},0).wait(1).to({rotation:141.4299,x:539,y:439.2},0).wait(1).to({rotation:143.5726,x:539.35,y:438.8},0).wait(1).to({rotation:145.7154,x:539.7,y:438.45},0).wait(1).to({rotation:147.8582,x:540.05,y:438.2},0).wait(1).to({rotation:150.001,x:540.4,y:437.85},0).wait(1).to({rotation:146.6678,x:539.85,y:438.35},0).wait(1).to({rotation:143.3346,x:539.25,y:438.85},0).wait(1).to({rotation:140.0013,x:538.75,y:439.4},0).wait(1).to({rotation:136.6681,x:538.3,y:439.95},0).wait(1).to({rotation:133.3349,x:537.85,y:440.55},0).wait(1).to({rotation:130.0017,x:537.45,y:441.2},0).wait(1).to({rotation:126.6684,x:537.05,y:441.85},0).wait(1).to({rotation:123.3352,x:536.8,y:442.5},0).wait(1).to({rotation:120.002,x:536.45,y:443.2},0).wait(1).to({rotation:117.502,x:536.3,y:443.75},0).wait(1).to({rotation:115.002,x:536.1,y:444.25},0).wait(1).to({rotation:112.502,x:535.95,y:444.75},0).wait(1).to({rotation:110.0019,x:535.8,y:445.3},0).wait(1).to({rotation:107.5019,x:535.75,y:445.9},0).wait(1).to({rotation:105.0019,x:535.65,y:446.4},0).wait(1).to({rotation:102.5019,y:447},0).wait(1).to({rotation:100.0019,x:535.55,y:447.55},0).wait(1).to({rotation:97.5019,y:448.1},0).wait(1).to({rotation:95.0018,y:448.65},0).wait(1).to({rotation:92.5018,x:535.6,y:449.25},0).wait(1).to({rotation:90.0018,x:535.7,y:449.75},0).wait(1).to({rotation:87.694,x:535.75,y:450.25},0).wait(1).to({rotation:85.3863,x:535.9,y:450.75},0).wait(1).to({rotation:83.0785,x:536,y:451.25},0).wait(1).to({rotation:80.7707,x:536.2,y:451.8},0).wait(1).to({rotation:78.463,x:536.35,y:452.25},0).wait(1).to({rotation:76.1552,x:536.5,y:452.7},0).wait(1).to({rotation:73.8474,x:536.7,y:453.2},0).wait(1).to({rotation:71.5396,x:536.95,y:453.65},0).wait(1).to({rotation:69.2319,x:537.15,y:454.1},0).wait(1).to({rotation:66.9241,x:537.45,y:454.55},0).wait(1).to({rotation:64.6163,x:537.7,y:455},0).wait(1).to({rotation:62.3086,x:538,y:455.4},0).wait(1).to({rotation:60.0008,x:538.3,y:455.85},0).wait(3).to({_off:true},1).wait(24).to({_off:false,rotation:0,x:547.15,y:518.4},0).to({_off:true},5).wait(421));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(150).to({_off:false},0).wait(1).to({regX:13.2,regY:11.7,rotation:-23.212,x:605.95,y:554.55},0).wait(1).to({rotation:-38.2114,x:609.25,y:554.8},0).wait(1).to({rotation:-53.2108,x:612.5,y:554.2},0).wait(1).to({rotation:-64.584,x:614.8,y:553.15},0).wait(1).to({rotation:-75.9572,x:616.9,y:551.7},0).wait(1).to({_off:true},1).wait(414));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(254).to({_off:false},0).wait(1).to({regY:13.5,rotation:-4.2856,x:615.65,y:547.6},0).wait(1).to({rotation:-8.5712,x:614.1,y:552.2},0).wait(1).to({rotation:-12.8568,x:612.6,y:556.75},0).wait(1).to({rotation:-17.1424,x:611.65,y:556.45},0).wait(1).to({rotation:-21.428,x:610.7,y:556.1},0).wait(1).to({rotation:-25.7136,x:609.7,y:555.75},0).wait(1).to({rotation:-29.9992,x:608.7,y:555.25},0).wait(2).to({_off:true},1).wait(307));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(264).to({_off:false},0).wait(1).to({regX:10.7,regY:14,rotation:14.9996,x:611.95,y:565.05},0).wait(1).to({rotation:29.9992,x:609,y:565},0).wait(1).to({_off:true},1).wait(303));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(272).to({_off:false},0).wait(1).to({regX:10.6,regY:13.9,rotation:24.9998,x:569.1,y:560.85},0).wait(1).to({rotation:49.9997,x:564.25,y:559.45},0).wait(1).to({rotation:74.9995,x:560.1,y:555.8},0).wait(1).to({rotation:54.9996,x:563.85,y:558.15},0).wait(1).to({rotation:34.9996,x:568.15,y:559.15},0).wait(1).to({rotation:14.9997,x:572.45,y:558.6},0).to({_off:true},1).wait(292));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(279).to({_off:false},0).wait(1).to({regX:11.7,regY:13.2,rotation:7.5001,x:575.8,y:558},0).wait(1).to({rotation:15.0001,x:573.6,y:558.35},0).wait(1).to({rotation:22.5002,x:571.3,y:558.6},0).wait(1).to({rotation:30.0003,x:569,y:558.75},0).wait(1).to({rotation:37.5003,x:566.6,y:558.7},0).wait(1).to({rotation:45.0004,x:564.15,y:558.6},0).wait(1).to({rotation:41.2507,x:568.55,y:560.1},0).wait(1).to({rotation:37.5011,x:572.95,y:561.6},0).wait(1).to({rotation:33.7515,x:577.3,y:563.1},0).wait(1).to({rotation:30.0018,x:581.65,y:564.55},0).wait(2).to({_off:true},1).wait(279));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(313).to({_off:false},0).wait(1).to({regY:14,rotation:3.749,x:580.8,y:563.4},0).wait(1).to({rotation:7.498,x:576.25,y:560.65},0).wait(1).to({rotation:11.247,x:571.8,y:557.75},0).wait(1).to({rotation:14.9961,x:569.8,y:557.5},0).wait(1).to({rotation:18.7451,x:567.75,y:557.25},0).wait(1).to({rotation:22.4941,x:565.75,y:556.95},0).wait(1).to({rotation:26.2431,x:563.7,y:556.55},0).wait(1).to({_off:true},1).wait(249));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(353).to({_off:false},0).wait(1).to({regX:13.9,regY:10.6,rotation:-1.6665,x:560.3,y:547.95},0).wait(1).to({rotation:-3.3331,x:563.7,y:549.55},0).wait(1).to({rotation:-4.9996,x:567.05,y:551.1},0).wait(1).to({rotation:-6.6662,x:570.5,y:552.7},0).wait(1).to({rotation:-8.3327,x:573.9,y:554.25},0).wait(1).to({rotation:-9.9993,x:577.3,y:555.85},0).wait(1).to({rotation:-11.6658,x:580.7,y:557.4},0).wait(1).to({rotation:-13.3324,x:584.15,y:558.9},0).wait(1).to({rotation:-14.9989,x:587.6,y:560.45},0).wait(1).to({rotation:-17.9987,x:590,y:561.75},0).wait(1).to({rotation:-20.9985,x:592.4,y:562.95},0).wait(1).to({rotation:-23.9983,x:594.85,y:564.25},0).wait(1).to({rotation:-26.9981,x:597.3,y:565.4},0).wait(1).to({rotation:-29.9979,x:599.8,y:566.6},0).wait(3).to({_off:true},1).wait(200));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(371).to({_off:false},0).wait(1).to({regX:10.9,regY:14,rotation:9.9997,x:615.6,y:571.25},0).wait(1).to({rotation:19.9995,x:612.6,y:570.8},0).wait(1).to({rotation:29.9992,x:609.75,y:569.8},0).wait(2).to({_off:true},1).wait(194));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_fingerRIGHT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fingerRIGHT
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAPgaQgBAAgDgBQgEgCgGAAQgMACgJAIQgJAJAAALQAAAGABAGQACADACAEAAPgaQgCAAgDABQgOABgLAJQgKAJAAAQQAAAEABAGQACABABACQAIAIANAAQAMgBAJgJQAJgIAAgNQABgMgJgIQgDgEgEgCg");
	this.shape.setTransform(777.9451,517.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgrAWQACACAiA5QAYApAeAGQAKACANgDQAqgMAIgsQABgKABgIQADgigHgdQgJglghgjQgSgTgVgLQgLgGgLgEQgEgCgFgBQgRgEgOACAgZAGQAIgLAAgOQAAgQgKgMQgCgDgCgCQgHgGgHgEQgIgDgKAAQAAgBgPgMQgPgMgOAOQgLAMgDAeQAAAFgBAHQAAACAAADQAAAPAEANQAFARALAQQAWAaAPgHQAQgHAGgiAgZAGQgggCAOASQAGgEAGgFQADgEADgDgAhAhQQAAAGABAJ");
	this.shape_1.setTransform(781.9833,527.6714);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgXAVIgDgDIgBgKQAAgQAKgJQALgJAOgBIAFgBQAEACADAEQAJAIgBAMQAAANgJAIQgJAJgMABQgNAAgIgIg");
	this.shape_2.setTransform(778.1264,517.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AAvCAQgegGgYgpQgig5gCgCQAGgEAGgFIAGgHIgGAHQgGAFgGAEIgBgBIAAAAIgBgBIAAAAIAAgBQgJgNAXAAIAAAAIAAAAIAGAAIgGAAIAAAAIAAAAQgXAAAJANIAAABIAAAAIABABIAAAAIABABQgGAigQAHQgPAHgWgaQgLgQgFgRQgEgNAAgPIAAgFIABgMQADgeALgMQAOgOAPAMIAPANQAKAAAIADQAHAEAHAGIAEAFQAKAMAAAQQAAAOgIALQAIgLAAgOQAAgQgKgMIgEgFQgHgGgHgEQgIgDgKAAIgBgPIACADQAJAIANAAQAMgBAJgJQAJgIABgOQAAgMgIgIQgEgEgEgCQAOgCARAEIAJADQALAEALAGQAVALASATQAhAjAJAlQAHAdgDAiIgCASQgIAsgqAMIgOACIgJgBgAgrAWIAAAAg");
	this.shape_3.setTransform(781.9833,527.6714);

	this.instance = new lib.hand1();
	this.instance.setTransform(776.9,517.95,1,1,0,0,0,7.2,3.4);
	this.instance._off = true;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#996600").ss(1,1,1).p("AAPgaQgCAAgDABQgOABgLAJQgKAJAAAQQAAAEABAGAAPgaQgBAAgDgBQgEgCgGAAQgMACgJAIQgJAJAAALQAAAGABAGQACADACAEQACABABACQAIAIANAAQAMgBAJgJQAJgIAAgNQABgMgJgIQgDgEgEgCg");
	this.shape_4.setTransform(777.9451,517.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFCC99").ss(1,1,1).p("AgrAWQACACAiA5QAYApAeAGQAKACANgDQAqgMAIgsQABgKABgIQADgigHgdQgJglghgjQgSgTgVgLQgLgGgLgEQgEgCgFgBQgRgEgOACAg/hBQAAgBgPgMQgPgMgOAOQgLAMgDAeQAAAFgBAHQAAACAAADQAAAPAEANQAFARALAQQAWAaAPgHQAQgHAGgiAhAhQQAAAGABAJAgZAGQAIgLAAgOQAAgQgKgMQgCgDgCgCQgHgGgHgEQgIgDgKAAAgZAGQgggCAOASQAGgEAGgFQADgEADgDg");
	this.shape_5.setTransform(769.4833,537.2714);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#996600").ss(1,1,1).p("AAPgaQgBgBgDAAQgEgCgGgBQgMACgJAJQgJAJAAALQAAAGABAGQACADACAEQACABABACQAIAHANAAQAMAAAJgJQAJgIAAgNQABgNgJgIQgDgEgEgBQgCAAgDAAQgOABgLAKQgKAJAAAPQAAAFABAG");
	this.shape_6.setTransform(765.4451,527.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC99").s().p("AAvCAQgegGgYgpQgig5gCgCQAGgEAGgFIAGgHIgGAHQgGAFgGAEIgBgBIAAAAIAAAAQgLgPAYAAIAAAAIAAAAIAGAAQAIgLAAgOQAAgQgKgMIgEgFQgHgGgHgEQgIgDgKAAQAKAAAIADQAHAEAHAGIAEAFQAKAMAAAQQAAAOgIALIgGAAIAAAAIAAAAQgYAAALAPIAAAAIAAAAIABABQgGAigQAHQgPAHgWgaQgLgQgFgRQgEgNAAgPIAAgFIABgMQADgeALgMQAOgOAPAMIAPANIgBgPIACADQAJAIANAAQAMgBAJgJQAJgIABgOQAAgMgIgIQgEgEgEgCQAOgCARAEIAJADQALAEALAGQAVALASATQAhAjAJAlQAHAdgDAiIgCASQgIAsgqAMIgOACIgJgBgAgrAWIAAAAg");
	this.shape_7.setTransform(769.4833,537.2714);

	this.instance_1 = new lib.arm3();
	this.instance_1.setTransform(752.05,536.75,1,1,0,0,0,16.1,3.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2,p:{x:778.1264,y:517.775}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2,p:{x:778.1264,y:517.775}},{t:this.shape_3},{t:this.shape},{t:this.shape_1}]},9).to({state:[{t:this.instance}]},53).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_2,p:{x:778.1264,y:517.775}},{t:this.shape_3},{t:this.shape_4},{t:this.shape_1}]},1).to({state:[{t:this.shape_2,p:{x:765.6264,y:527.375}},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},15).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},33).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},55).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[]},127).wait(188));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(62).to({_off:false},0).wait(1).to({regX:12.3,regY:13,rotation:-5.6249,x:782.9,y:527},0).wait(1).to({rotation:-11.2499,x:783.75,y:526.35},0).wait(1).to({rotation:-16.8748,x:784.5,y:525.65},0).wait(1).to({rotation:-22.4998,x:785.2,y:524.85},0).wait(1).to({rotation:-28.1247,x:785.9,y:523.95},0).wait(1).to({rotation:-33.7497,x:786.45,y:523.05},0).wait(1).to({rotation:-39.3746,x:786.9,y:522.1},0).wait(1).to({rotation:-44.9996,x:787.3,y:521.1},0).wait(1).to({rotation:-45.5783,y:521},0).wait(1).to({rotation:-46.1571,x:787.35,y:520.9},0).wait(1).to({rotation:-46.7358,y:520.8},0).wait(1).to({rotation:-47.3145,x:787.4,y:520.65},0).wait(1).to({rotation:-47.8933,y:520.55},0).wait(1).to({rotation:-48.472,x:787.45,y:520.45},0).wait(1).to({rotation:-49.0507,y:520.35},0).wait(1).to({rotation:-49.6295,y:520.25},0).wait(1).to({rotation:-50.2082,x:787.5,y:520.15},0).wait(1).to({rotation:-50.7869,x:787.55,y:520},0).wait(1).to({rotation:-51.3657,y:519.95},0).wait(1).to({rotation:-51.9444,x:787.6,y:519.8},0).wait(1).to({rotation:-47.479,x:787.4,y:520.7},0).wait(1).to({rotation:-43.0135,x:787.15,y:521.45},0).wait(1).to({rotation:-38.5481,x:786.85,y:522.25},0).wait(1).to({rotation:-34.0826,x:786.5,y:523},0).wait(1).to({rotation:-29.6172,x:786.05,y:523.75},0).wait(1).to({rotation:-25.1517,x:785.6,y:524.4},0).wait(1).to({rotation:-20.6863,x:785.05,y:525.1},0).wait(1).to({rotation:-16.2208,x:784.45,y:525.7},0).wait(1).to({rotation:-11.7554,x:783.85,y:526.3},0).wait(1).to({rotation:-6.1764,x:783,y:526.9},0).wait(1).to({rotation:-0.5974,x:782.1,y:527.45},0).wait(1).to({rotation:4.9816,x:781.1,y:527.9},0).wait(1).to({rotation:10.5606,x:780.1,y:528.3},0).wait(1).to({rotation:16.1396,x:779.1,y:528.55},0).wait(1).to({rotation:21.7187,x:778.1,y:528.75},0).wait(1).to({rotation:27.2977,x:777.05,y:528.8},0).wait(1).to({rotation:32.8767,x:775.95,y:528.75},0).wait(1).to({rotation:38.4557,x:774.9,y:528.65},0).wait(1).to({rotation:44.0347,x:773.85,y:528.4},0).wait(1).to({rotation:49.6137,x:772.85,y:528},0).wait(1).to({rotation:55.1927,x:771.9,y:527.55},0).wait(1).to({rotation:52.4655,x:772.4,y:527.8},0).wait(1).to({rotation:49.7383,x:772.85,y:528.05},0).wait(1).to({rotation:47.0111,x:773.35,y:528.2},0).wait(1).to({rotation:44.2839,x:773.8,y:528.35},0).wait(1).to({rotation:41.5567,x:774.35,y:528.5},0).wait(1).to({rotation:38.8296,x:774.85,y:528.6},0).wait(1).to({rotation:36.1024,x:775.35,y:528.7},0).wait(1).to({rotation:33.3752,x:775.85},0).wait(1).to({rotation:30.648,x:776.35,y:528.8},0).wait(1).to({rotation:27.9208,x:776.85},0).wait(1).to({rotation:25.1936,x:777.4},0).wait(5).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(140).to({_off:false},0).wait(1).to({regX:10.8,regY:13.7,rotation:-14.9999,x:749.5,y:547.65},0).wait(1).to({rotation:-29.9997,x:752.4,y:547.95},0).wait(1).to({rotation:-44.9996,x:755.3,y:547.45},0).wait(1).to({rotation:-59.9995,x:757.95,y:546.25},0).wait(1).to({rotation:-63.7493,x:758.6,y:545.85},0).wait(1).to({rotation:-67.499,x:759.15,y:545.4},0).wait(1).to({rotation:-71.2488,x:759.65,y:544.9},0).wait(1).to({rotation:-74.9986,x:760.25,y:544.4},0).wait(1).to({rotation:-37.4993,x:753.85,y:547.8},0).wait(1).to({rotation:0,x:746.75,y:546.65},0).wait(1).to({regX:16.1,regY:3.8,x:752.05,y:536.75},0).wait(34).to({regX:10.8,regY:13.7,x:751.65,y:546.65},0).wait(1).to({x:756.55},0).wait(1).to({x:761.5},0).wait(4).to({regX:16.1,regY:3.9,rotation:-59.4259,x:772.15,y:540.55},0).wait(55).to({x:762.15},0).wait(2).to({regX:14.5,regY:3.2,scaleX:0.9999,scaleY:0.9999,rotation:-59.4258,x:753.1,y:542.55},0).wait(1).to({regX:10.8,regY:13.7,scaleX:1,scaleY:1,rotation:-54.4259,x:759.45,y:551.6},0).wait(1).to({rotation:-49.4261,x:758.6,y:552.15},0).wait(1).to({rotation:-44.4262,x:757.75,y:552.65},0).wait(2).to({regX:16.1,regY:4,rotation:-14.426,x:753.2,y:542.7},0).to({_off:true},127).wait(188));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Drape = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Drape
	this.instance = new lib.drape();
	this.instance.setTransform(644.35,334.3,1.0497,0.9885,0,0,0,592.3,400.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:590.8,regY:416.4,x:642.7,y:335},0).wait(1).to({y:320.1},0).wait(1).to({y:305.1},0).wait(1).to({y:290.05},0).wait(1).to({y:274.9},0).wait(1).to({y:259.7},0).wait(1).to({y:244.4},0).wait(1).to({y:229},0).wait(1).to({y:213.6},0).wait(1).to({y:198.05},0).wait(1).to({y:181.7},0).wait(1).to({y:155.75},0).wait(1).to({y:129.65},0).wait(1).to({y:103.4},0).wait(1).to({y:77.05},0).wait(1).to({y:56.25},0).wait(1).to({y:36.3},0).wait(1).to({y:16.3},0).wait(1).to({y:-3.85},0).wait(1).to({y:-24.05},0).wait(1).to({y:-43.15},0).wait(1).to({y:-61.85},0).wait(1).to({y:-80.6},0).wait(1).to({y:-99.5},0).wait(1).to({y:-118.4},0).wait(1).to({y:-133.05},0).wait(1).to({y:-145.75},0).wait(1).to({y:-158.5},0).wait(1).to({y:-171.3},0).wait(1).to({y:-184.15},0).wait(1).to({y:-197.05},0).wait(1).to({y:-206.6},0).wait(1).to({y:-215.35},0).wait(1).to({y:-224.1},0).wait(1).to({y:-232.9},0).wait(1).to({y:-241.85},0).wait(1).to({y:-261.6},0).wait(1).to({y:-281.4},0).wait(1).to({y:-299.45},0).wait(1).to({y:-309.3},0).wait(1).to({y:-319.2},0).wait(1).to({y:-329.1},0).wait(1).to({y:-342.2},0).wait(1).to({y:-358.85},0).wait(1).to({y:-375.6},0).wait(1).to({y:-392.45},0).wait(1).to({y:-395.7},0).wait(2).to({regX:592.3,regY:401.6,x:644.35,y:-419.95},0).wait(572));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_clouds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// clouds
	this.instance = new lib.clouds3();
	this.instance.setTransform(11.3,371.45,0.5018,0.5018,0.0436,0,0,384.8,558.7);
	this.instance.alpha = 0.4102;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(417).to({_off:false},0).wait(1).to({regX:11.6,regY:35.9,rotation:0.0437,x:-172,y:167.8,alpha:0.41},0).wait(1).to({x:-168.2,y:161.9},0).wait(1).to({x:-152.75,y:162.15},0).wait(1).to({x:-137.35,y:162.45},0).wait(1).to({x:-121.95,y:162.7},0).wait(1).to({x:-106.55,y:162.95},0).wait(1).to({x:-91.15,y:163.2},0).wait(1).to({x:-75.75,y:163.5},0).wait(1).to({x:-60.35,y:163.75},0).wait(1).to({x:-44.95,y:164},0).wait(1).to({x:-29.55,y:164.25},0).wait(1).to({x:-14.15,y:164.55},0).wait(1).to({x:1.25,y:164.8},0).wait(1).to({x:16.6,y:165.05},0).wait(1).to({x:32,y:165.3},0).wait(1).to({x:47.45,y:165.6},0).wait(1).to({x:62.85,y:165.85},0).wait(1).to({x:78.25,y:166.1},0).wait(1).to({x:93.65,y:166.35},0).wait(1).to({x:109.05,y:166.65},0).wait(1).to({x:124.45,y:166.9},0).wait(1).to({x:139.85,y:167.15},0).wait(1).to({x:155.25,y:167.4},0).wait(1).to({x:170.65,y:167.7},0).wait(1).to({x:186.05,y:167.95},0).wait(1).to({x:201.45,y:168.2},0).wait(1).to({x:216.85,y:168.45},0).wait(1).to({x:232.25,y:168.75},0).wait(1).to({x:236.6,y:169},0).wait(1).to({x:240.95,y:169.25},0).wait(1).to({x:245.3,y:169.5},0).wait(1).to({x:249.65,y:169.75},0).wait(1).to({x:254,y:170},0).wait(1).to({x:258.35,y:170.25},0).wait(1).to({x:262.7,y:170.5},0).wait(1).to({x:267.05,y:170.75},0).wait(1).to({x:271.35,y:171},0).wait(1).to({x:275.7,y:171.25},0).wait(1).to({x:280.05,y:171.5},0).wait(1).to({x:284.4,y:171.75},0).wait(1).to({x:288.75,y:172},0).wait(1).to({x:293.1,y:172.25},0).wait(1).to({x:297.45,y:172.5},0).wait(1).to({x:301.8,y:172.75},0).wait(1).to({x:306.1,y:173},0).wait(1).to({x:310.45,y:173.3},0).wait(1).to({x:314.8,y:173.55},0).wait(1).to({x:319.15,y:173.8},0).wait(1).to({x:323.5,y:174.05},0).wait(1).to({x:327.85,y:174.3},0).wait(1).to({x:332.2,y:174.55},0).wait(1).to({x:336.55,y:174.8},0).wait(1).to({x:340.85,y:175.05},0).wait(1).to({x:345.2,y:175.3},0).wait(1).to({x:349.55,y:175.55},0).wait(1).to({x:353.9,y:175.8},0).wait(1).to({x:358.25,y:176.05},0).wait(1).to({x:362.6,y:176.3},0).wait(1).to({x:366.95,y:176.55},0).wait(1).to({x:371.3,y:176.8},0).wait(1).to({x:375.6,y:177.05},0).wait(1).to({x:379.95,y:177.3},0).wait(1).to({x:384.3,y:177.55},0).wait(1).to({x:388.65,y:177.8},0).wait(1).to({x:393,y:178.05},0).wait(1).to({x:397.35,y:178.3},0).wait(1).to({x:401.7,y:178.55},0).wait(1).to({x:406.05,y:178.8},0).wait(1).to({x:410.35,y:179.05},0).wait(1).to({x:414.7,y:179.35},0).wait(1).to({x:419.05,y:179.6},0).wait(1).to({x:423.4,y:179.85},0).wait(1).to({x:427.75,y:180.1},0).wait(1).to({x:432.1,y:180.35},0).wait(1).to({x:436.45,y:180.6},0).wait(1).to({x:440.8,y:180.85},0).wait(1).to({x:445.1,y:181.1},0).wait(1).to({x:449.45,y:181.35},0).wait(1).to({x:453.8,y:181.6},0).wait(1).to({x:454.95,y:180.85},0).wait(1).to({x:456.05,y:180.1},0).wait(1).to({x:457.15,y:179.35},0).wait(1).to({x:458.25,y:178.55},0).wait(1).to({x:459.4,y:177.8},0).wait(1).to({x:460.5,y:177.05},0).wait(1).to({x:461.6,y:176.3},0).wait(1).to({x:462.75,y:175.55},0).wait(1).to({x:463.85,y:174.8},0).wait(1).to({x:464.95,y:174.05},0).wait(1).to({x:466.1,y:173.3},0).wait(1).to({x:467.2,y:172.55},0).wait(1).to({x:468.3,y:171.75},0).wait(1).to({x:469.45,y:171},0).wait(1).to({x:470.55,y:170.25},0).wait(1).to({x:471.65,y:169.5},0).wait(1).to({x:472.8,y:168.75},0).wait(1).to({x:473.9,y:168},0).wait(1).to({x:475,y:167.25},0).wait(1).to({x:476.15,y:166.5},0).wait(1).to({x:477.25,y:165.75},0).wait(1).to({x:478.35,y:164.95},0).wait(1).to({x:479.45,y:164.2},0).wait(1).to({x:480.6,y:163.45},0).wait(1).to({x:481.7,y:162.7},0).wait(1).to({x:482.8,y:161.95},0).wait(1).to({x:483.95,y:161.2},0).wait(1).to({x:485.05,y:160.45},0).wait(1).to({x:486.15,y:159.7},0).wait(1).to({x:487.3,y:158.95},0).wait(1).to({x:488.4,y:158.15},0).wait(1).to({x:489.5,y:157.4},0).wait(1).to({x:490.65,y:156.65},0).wait(1).to({x:491.75,y:155.9},0).wait(1).to({x:492.85,y:155.15},0).wait(1).to({x:494,y:154.4},0).wait(1).to({x:495.1,y:153.65},0).wait(1).to({x:496.2,y:152.9},0).wait(1).to({x:497.35,y:152.15},0).wait(1).to({x:498.45,y:151.35},0).wait(1).to({x:499.55,y:150.6},0).wait(1).to({x:500.65,y:149.85},0).wait(1).to({x:501.8,y:149.1},0).wait(1).to({x:502.9,y:148.35},0).wait(1).to({x:504,y:147.6},0).wait(1).to({x:505.15,y:146.85},0).wait(1).to({x:506.25,y:146.1},0).wait(1).to({x:507.35,y:145.35},0).wait(1).to({x:508.5,y:144.55},0).wait(1).to({x:509.6,y:143.8},0).wait(1).to({x:510.7,y:143.05},0).wait(1).to({x:511.85,y:142.3},0).wait(1).to({x:512.95,y:141.55},0).wait(1).to({x:514.05,y:140.8},0).wait(1).to({x:515.2,y:140.05},0).wait(1).to({x:516.3,y:139.3},0).wait(1).to({x:517.4,y:138.55},0).wait(1).to({x:518.55,y:137.75},0).wait(1).to({x:519.65,y:137},0).wait(1).to({x:520.75,y:136.25},0).wait(1).to({x:521.9,y:135.5},0).wait(1).to({x:523,y:134.75},0).wait(1).to({x:524.1,y:134},0).wait(1).to({x:525.2,y:133.25},0).wait(1).to({x:526.35,y:132.5},0).wait(1).to({x:527.45,y:131.75},0).wait(1).to({x:528.55,y:130.95},0).wait(1).to({x:529.7,y:130.2},0).wait(1).to({x:530.8,y:129.45},0).wait(1).to({x:531.9,y:128.7},0).wait(1).to({x:533.05,y:127.95},0).wait(1).to({x:534.15,y:127.2},0).wait(1).to({x:535.25,y:126.45},0).wait(1).to({x:536.4,y:125.7},0).wait(1).to({x:537.5,y:124.95},0).wait(1).to({x:538.6,y:124.15},0).wait(1).to({x:539.75,y:123.4},0).wait(1).to({x:540.85,y:122.65},0).wait(1).to({x:541.95,y:121.9},0).wait(1).to({x:543.1,y:121.15},0).wait(1).to({x:544.2,y:120.4},0).wait(1).to({x:545.3,y:119.65},0).wait(1).to({x:546.4,y:118.9},0).wait(1).to({x:547.55,y:118.15},0).wait(1).to({x:548.65,y:117.35},0).wait(1).to({x:549.75,y:116.6},0).wait(1).to({x:550.9,y:115.85},0).wait(1).to({x:552,y:115.1},0).wait(1).to({x:553.1,y:114.35},0).wait(1).to({x:554.25,y:113.6},0).wait(1).to({x:555.35,y:112.85},0).wait(1).to({x:556.45,y:112.1},0).wait(1).to({x:557.6,y:111.35},0).wait(1).to({x:558.7,y:110.55},0).wait(1).to({x:559.8,y:109.8},0).wait(1).to({x:560.95,y:109.05},0).wait(1).to({x:562.05,y:108.3},0).wait(1).to({x:563.15,y:107.55},0).wait(1).to({x:564.3,y:106.8},0).wait(1).to({x:565.4,y:106.05},0).wait(1).to({x:566.5,y:105.3},0).wait(1).to({x:567.6,y:104.55},0).wait(1).to({x:568.75,y:103.75},0).wait(1).to({x:569.85,y:103},0).wait(1).to({x:570.95,y:102.25},0).wait(1).to({x:572.1,y:101.5},0).wait(1).to({x:573.2,y:100.75},0).wait(1).to({x:574.3,y:100},0).wait(1).to({x:575.45,y:99.25},0).wait(1).to({x:576.55,y:98.5},0).wait(1).to({x:577.65,y:97.75},0).wait(1).to({x:578.8,y:96.95},0).wait(1).to({x:579.9,y:96.2},0).wait(1).to({x:581,y:95.45},0).wait(1).to({x:582.15,y:94.7},0).wait(1).to({x:583.25,y:93.95},0).wait(1).to({x:584.35,y:93.2},0).wait(1).to({x:585.5,y:92.45},0).wait(1).to({x:586.6,y:91.7},0).wait(1).to({x:587.7,y:90.95},0).wait(1).to({x:588.8,y:90.15},0).wait(1).to({x:589.95,y:89.4},0).wait(1).to({x:591.05,y:88.65},0).wait(1).to({x:592.15,y:87.9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bottonStart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bottonStart
	this.start = new lib.botton();
	this.start.name = "start";
	this.start.setTransform(132.25,104.8,0.7873,0.7873);
	new cjs.ButtonHelper(this.start, 0, 1, 2, false, new lib.botton(), 3);

	this.replay = new lib.bottonreplay();
	this.replay.name = "replay";
	this.replay.setTransform(833.75,271.6,0.1405,0.1405);
	new cjs.ButtonHelper(this.replay, 0, 1, 2, false, new lib.bottonreplay(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},1).to({state:[{t:this.replay}]},618).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_armR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// armR
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.7,1,1).p("AAYAAQAAAJgIAHQgGAHgKAAQgJAAgGgHQgIgHAAgJQAAgJAIgHQAGgHAJAAQAKAAAGAHQAIAHAAAJg");
	this.shape.setTransform(775.5,455.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfkGIAAAUIAAH7QAAATgJANQgIAMgMABQgBAAAAAAIgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAHgMAMgBIACAAQAAAAABAAQABAAAAAAQALABAIALIAAABQAHAKACAN");
	this.shape_1.setTransform(775.4,481.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgUAcQgKgIgDgLQgEgQALgNQAHgJAMgDQALgDALAFIABAAIAAABQAHAKACANQgCgNgHgKIAAgBQAKAFAFALIADAIQABAGgBAEIAAABIAAACQgCAJgHAIIgDADQgKAIgMAAIAAAAQgLAAgJgHgAgbAFQAAAJAHAHQAHAHAJAAQAJAAAHgHQAHgHAAgJIAAAAQAAgJgHgHQgHgHgJAAQgJAAgHAHQgHAHAAAJIAAAAgAAZAYIAAgUgAgUAVQgHgHAAgJQAAgJAHgHQAHgHAJAAQAJAAAHAHQAHAHAAAJIAAAAQAAAJgHAHQgHAHgJAAQgJAAgHgHgAATAFIAAAAgAAQgeIAAAAg");
	this.shape_2.setTransform(775.9532,454.9953);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AABE2IgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAIgMALgBIACAAIABAAIABAAQALABAIALQgIgLgLgBQAPABALAMQAJAKACANIgDgIQgFgLgKgFIgBAAQgLgFgLADQgMADgHAJQgLANAEARQADALAKAIQAKAHAKAAQAMAAAKgIIADgDIAAH7QAAATgJANQgIAMgMABQAMgBAIgMQAJgNAAgTIAAn7QAHgIACgJIAAgCIABIOQAAATgMANQgLAMgQABIgBAAgAgcEpQgMgNAAgTIABoRQAAgTALgNQALgNAQAAQgLABgIAMQgJANAAATIgBIRQAAATAKANQAJANALAAQgPAAgNgNgAAfjygAgBk1IAAAAg");
	this.shape_3.setTransform(775.375,481.675);

	this.instance = new lib._1();
	this.instance.setTransform(756.85,479.7,1,1,0,0,0,4.1,5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3,p:{x:775.375,y:481.675,rotation:0}},{t:this.shape_2,p:{x:775.9532,y:454.9953,rotation:0}},{t:this.shape_1,p:{x:775.4,y:481.675,rotation:0}},{t:this.shape,p:{x:775.5,y:455.45,rotation:0}}]}).to({state:[{t:this.shape_3,p:{x:762.875,y:497.075,rotation:0}},{t:this.shape_2,p:{x:763.4532,y:470.3953,rotation:0}},{t:this.shape_1,p:{x:762.9,y:497.075,rotation:0}},{t:this.shape,p:{x:763,y:470.85,rotation:0}}]},135).to({state:[{t:this.shape_3,p:{x:751.825,y:505.725,rotation:0}},{t:this.shape_2,p:{x:752.4032,y:479.0453,rotation:0}},{t:this.shape_1,p:{x:751.85,y:505.725,rotation:0}},{t:this.shape,p:{x:751.95,y:479.5,rotation:0}}]},5).to({state:[{t:this.instance}]},44).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_3,p:{x:763.2653,y:505.6925,rotation:-14.9992}},{t:this.shape_2,p:{x:756.919,y:479.7723,rotation:-14.9992}},{t:this.shape_1,p:{x:763.2895,y:505.6861,rotation:-14.9992}},{t:this.shape,p:{x:756.5989,y:480.3288,rotation:-14.9992}}]},1).to({state:[{t:this.shape_3,p:{x:759.8098,y:505.1352,rotation:-19.8072}},{t:this.shape_2,p:{x:751.3133,y:479.8384,rotation:-19.8072}},{t:this.shape_1,p:{x:759.8333,y:505.1268,rotation:-19.8072}},{t:this.shape,p:{x:751.041,y:480.4197,rotation:-19.8072}}]},52).to({state:[{t:this.shape_3,p:{x:754.8815,y:506.1347,rotation:-10.0861}},{t:this.shape_2,p:{x:750.7784,y:479.7665,rotation:-10.0861}},{t:this.shape_1,p:{x:754.9061,y:506.1303,rotation:-10.0861}},{t:this.shape,p:{x:750.4119,y:480.2936,rotation:-10.0861}}]},3).to({state:[{t:this.shape_3,p:{x:751.3087,y:506.3208,rotation:-3.1114}},{t:this.shape_2,p:{x:750.4379,y:479.6497,rotation:-3.1114}},{t:this.shape_1,p:{x:751.3337,y:506.3195,rotation:-3.1114}},{t:this.shape,p:{x:750.0101,y:480.1283,rotation:-3.1114}}]},2).to({state:[]},132).wait(188));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(184).to({_off:false},0).wait(1).to({regY:31,rotation:-3.1474,x:758.25,y:505.6},0).wait(1).to({rotation:-6.2948,x:759.7,y:505.5},0).wait(1).to({rotation:-9.4422,x:761.1,y:505.35},0).wait(3).to({_off:true},1).wait(377));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_armL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// armL
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ACPDKQgIAGgMgFQgMgFgJgMIj1lZQgGgJgCgKQAAgCAAgEQAAgMAHgGQAJgFALAEQAIADAFAGQAFAEADAGID1FYQAJAMABANQABAMgKAFg");
	this.shape.setTransform(567.6046,469.4198);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ADQCHQgFAJgNgBQgNgBgNgHIlkjlQgIgHgHgIQAAgCgCgDQgEgMAEgIQAHgIAMAAQAIAAAHADQAGACAGAEIFjDlQAMAIAFALQAGALgHAJg");
	this.shape_1.setTransform(561.2585,479.255);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFCC99").ss(12,1,1).p("ADsBMQgCAKgNADQgNADgOgEImTiBQgKgEgJgGQgBgDgCgCQgHgKACgJQAEgKAMgDQAHgCAIACQAGgBAHADIGTCBQANAFAJAJQAHAJgEAKg");
	this.shape_2.setTransform(577.3383,491.4643);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFCC99").ss(12,1,1).p("AD2gaQADAKgLAHQgLAIgOACImlAvQgKAAgLgCQgCgBgDgCQgLgGgBgJQAAgLAJgIQAGgEAIgCQAFgDAIAAIGkgvQAOAAAMAFQAKAEAAAMg");
	this.shape_3.setTransform(578.1719,502.8727);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(12,1,1).p("Agaj1QAKgDAHALQAIALACAOIAvGlQAAAKgCALQgBACgCADQgGALgJABQgLAAgIgJQgEgGgCgIQgDgFAAgIIgvmkQAAgOAFgMQAEgKAMAAg");
	this.shape_4.setTransform(603.9227,519.0781);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFCC99").ss(12,1,1).p("AhZjmQAJgFAKAJQAKAIAGANICaGLQADAJABALQgBADgBADQgDAMgIADQgLADgKgHQgGgEgDgHQgEgEgDgIIiZmJQgFgOACgMQACgMALgDg");
	this.shape_5.setTransform(594.6313,518.1524);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFCC99").ss(12,1,1).p("AiRjGQAHgIAMAGQAMAFAJALID7FWQAFAIAEAKQAAADAAADQAAAMgHAGQgKAGgLgFQgHgCgFgGQgEgDgFgHIj6lUQgJgMgBgMQgBgMAKgFg");
	this.shape_6.setTransform(601.4707,516.1051);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFCC99").ss(12,1,1).p("AjAiaQAFgJANADQANACAMAIIFKEJQAIAGAHAJQAAADABACQADANgFAHQgIAIgMgBQgHgBgHgFQgFgCgHgFIlJkHQgMgKgEgKQgEgMAIgIg");
	this.shape_7.setTransform(608.4527,510.6784);

	this.instance = new lib.pants2();
	this.instance.setTransform(591.1,497.4,1,1,0,0,0,2.5,2.9);
	this.instance._off = true;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFCC99").ss(12,1,1).p("AgHj3QAJgCAGALQAHAMACANIANGoQABAKgDALQgCACgBADQgIAKgIABQgLgCgGgJQgFgGAAgIQgCgFAAgJIgPmlQAAgPAFgLQAGgKAMABg");
	this.shape_8.setTransform(612.1042,524.4519);

	this.instance_1 = new lib.arm15();
	this.instance_1.setTransform(609.05,499.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFCC99").ss(12,1,1).p("AA2jwQAKgBADANQAEANgCANIhbGeQgCAKgFAKQgCABgCAEQgKAHgJgBQgKgFgEgKQgDgHABgIQAAgGACgHIBZmdQAEgOAHgJQAJgJALAFg");
	this.shape_9.setTransform(579.7208,519.72);

	this.instance_2 = new lib.arm13();
	this.instance_2.setTransform(591.7,491.6,1,1,0,0,0,24.9,-3.7);
	this.instance_2._off = true;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FFCC99").ss(12,1,1).p("AAVj2QAKgBAFAMQAFAMAAAOIgkGmQgBAKgEALQgBABgCAEQgIAIgJAAQgMgDgEgKQgFgGABgIQgBgGAAgHIAkmlQACgPAGgKQAGgKAMADg");
	this.shape_10.setTransform(584.2,521.8154);

	this.instance_3 = new lib.arm10();
	this.instance_3.setTransform(591.75,491.6,1,1,0,0,0,11.7,-5.5);
	this.instance_3._off = true;

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFCC99").ss(12,1,1).p("ABHjrQALAAACANQACANgCAPIh5GUQgCAKgHAJQgCABgCAEQgLAGgIgCQgLgFgCgKQgEgHADgIQABgGABgHIB4mVQAFgOAJgIQAIgJAKAGg");
	this.shape_11.setTransform(579.5104,517.7285);

	this.instance_4 = new lib.arm7();
	this.instance_4.setTransform(588,493.85,1,1,0,0,0,17,0);
	this.instance_4._off = true;

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFCC99").ss(12,1,1).p("Agfj0QAKgEAHALQAHALAEAPIA1GjQACAKgDAKQgBACgBAFQgHAKgIABQgNAAgFgIQgHgGAAgIQgCgFgCgIIg1mjQgBgPAEgLQAEgLAMABg");
	this.shape_12.setTransform(613.5094,529.3367);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},129).to({state:[{t:this.shape_1}]},6).to({state:[{t:this.shape_2}]},5).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_4,p:{x:603.9227,y:519.0781}}]},5).to({state:[{t:this.shape_4,p:{x:597.5727,y:518.1781}}]},26).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.instance}]},72).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:0,x:609.05,y:499.65}}]},5).to({state:[{t:this.instance_1,p:{regX:3.1,regY:24.8,x:600.35,y:523.55}}]},1).to({state:[{t:this.instance_1,p:{regX:3.1,regY:24.8,x:588.6,y:522.65}}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.instance_3}]},21).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.instance_4}]},31).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.shape_12}]},1).to({state:[]},9).wait(164));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(254).to({_off:false},0).wait(1).to({regX:19.9,regY:16.2,rotation:9.9997,x:608.75,y:513.5},0).wait(1).to({rotation:19.9995,x:608.55,y:515.8},0).wait(1).to({rotation:29.9992,x:608,y:517.6},0).wait(1).to({rotation:35.1103,x:608.3,y:518.25},0).wait(1).to({rotation:40.2215,x:608.55,y:518.75},0).wait(1).to({rotation:45.3327,x:608.75,y:519.1},0).wait(1).to({rotation:50.4438,x:608.85,y:519.25},0).wait(2).to({_off:true},1).wait(280));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(284).to({_off:false},0).wait(1).to({regX:9.7,regY:23.5,rotation:-2.9998,x:577.95,y:519.5},0).wait(1).to({rotation:-5.9996,x:579.4,y:520.2},0).wait(1).to({rotation:-8.9993,x:580.95,y:520.8},0).wait(1).to({rotation:-11.9991,x:582.5,y:521.35},0).wait(1).to({rotation:-14.9989,x:584.05,y:521.8},0).wait(2).to({_off:true},1).wait(252));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(313).to({_off:false},0).wait(1).to({regX:4.2,regY:24.7,rotation:3.3289,x:582.95,y:520.7},0).wait(1).to({rotation:6.6578,x:581.65,y:519.55},0).wait(1).to({rotation:9.9866,x:580.45,y:518.25},0).wait(1).to({rotation:11.3528,x:579.75,y:517.9},0).wait(1).to({rotation:12.7191,x:579.1,y:517.6},0).wait(1).to({rotation:14.0853,x:578.45,y:517.2},0).wait(1).to({rotation:15.4515,x:577.8,y:516.85},0).wait(1).to({_off:true},1).wait(222));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(353).to({_off:false},0).wait(1).to({regX:8.5,regY:23.9,rotation:-1.6665,x:581.7,y:517.95},0).wait(1).to({rotation:-3.3331,x:583.95,y:518.15},0).wait(1).to({rotation:-4.9996,x:586.1,y:518.35},0).wait(1).to({rotation:-6.6662,x:588.35,y:518.55},0).wait(1).to({rotation:-8.3327,x:590.55,y:518.7},0).wait(1).to({rotation:-9.9993,x:592.8,y:518.85},0).wait(1).to({rotation:-11.6658,x:595.05,y:518.95},0).wait(1).to({rotation:-13.3324,x:597.25,y:519.05},0).wait(1).to({rotation:-14.9989,x:599.55,y:519.1},0).wait(1).to({rotation:-16.54,x:601.3,y:520.25},0).wait(1).to({rotation:-18.081,x:603.05,y:521.35},0).wait(1).to({rotation:-19.6221,x:604.85,y:522.45},0).wait(1).to({rotation:-21.1631,x:606.65,y:523.55},0).wait(1).to({rotation:-22.7042,x:608.35,y:524.6},0).wait(3).to({_off:true},1).wait(173));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.punocchiosed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AgrA7QgPgKgJgQQgJgQAAgRQAKAXAVANQAUANAZABQAVABAOgIQAIgDACgGQABgFgEgJQgFgJgMgKQgJgIAAgFQAAgKANgFQAQgGADgCQAHgGgDgGQgDgGgLAAQgUACgUAJIgIAEQAOgPAQgJQATgMAOADQAJABAHAIQAHAHAAAJQABANgJALQgHAJgNAFQALALADAHQAHALgBAMQgCAPgOALQgKAIgSADQgLADgKAAQgZAAgVgOg");
	this.shape.setTransform(159.7537,147.3108);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	// Layer_1
	this.instance = new lib.close_blink();
	this.instance.setTransform(145.45,116.65,0.8378,0.8133,0,0,180,20.2,15);

	this.instance_1 = new lib.close_blink();
	this.instance_1.setTransform(184.05,120.95,0.8773,0.7909,10.7341,0,0,20.2,15.1);

	this.instance_2 = new lib.nose();
	this.instance_2.setTransform(163.55,132.3,1,1,-8.2483,0,0,1.5,1.7);

	this.instance_3 = new lib.hat();
	this.instance_3.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_4 = new lib.hair();
	this.instance_4.setTransform(154.4,73.95,1,1,0,0,0,83,45.8);

	this.instance_5 = new lib.Tshirt();
	this.instance_5.setTransform(112,160.8,1,1,0,0,0,106.5,129.3);

	this.instance_6 = new lib.face_clean();
	this.instance_6.setTransform(138.4,-1.3,1,1,0,0,180,66.5,-70.6);

	this.instance_7 = new lib.pents_only();
	this.instance_7.setTransform(54.3,281.05,1,1,8.1949,0,0,12.3,-12.4);

	this.instance_8 = new lib.CachedBmp_22();
	this.instance_8.setTransform(146.05,205.5,0.5,0.5);

	this.instance_9 = new lib.arm3();
	this.instance_9.setTransform(12.95,320.2,1,1,0,14.426,-165.574,16.1,4);

	this.instance_10 = new lib.legshoe();
	this.instance_10.setTransform(118.75,392.25,0.9999,0.9999,5.2167,0,0,14.1,-5);

	this.instance_11 = new lib.legshoe();
	this.instance_11.setTransform(53.6,402,0.9999,0.9999,0,-7.5043,172.4957,9.4,4.5);

	this.instance_12 = new lib.thigh();
	this.instance_12.setTransform(52.35,384.15,0.9999,0.9999,0,14.9746,-165.0254,13.2,19.6);

	this.instance_13 = new lib.CachedBmp_21();
	this.instance_13.setTransform(4.3,169.5,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_20();
	this.instance_14.setTransform(34.8,96.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(2));

	// Layer_2
	this.instance_15 = new lib.thigh();
	this.instance_15.setTransform(113.45,360.1,0.9999,0.9999,0,3.9973,-176.0027,16.1,-1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.3,0,236.2,501.2);


(lib.walk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pentsL
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("ADPlgIl1gSIgoLTIF2ASg");
	this.shape.setTransform(34.9798,34.3744,1,1,24.5455);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjOFhIAorTIF1ASIgnLTg");
	this.shape_1.setTransform(34.9798,34.3744,1,1,24.5455);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{rotation:24.5455,x:34.9798,y:34.3744}},{t:this.shape,p:{rotation:24.5455,x:34.9798,y:34.3744}}]}).to({state:[{t:this.shape_1,p:{rotation:-14.3914,x:54.1491,y:42.6185}},{t:this.shape,p:{rotation:-14.3914,x:54.1491,y:42.6185}}]},4).to({state:[{t:this.shape_1,p:{rotation:-4.1952,x:48.8929,y:42.3636}},{t:this.shape,p:{rotation:-4.1952,x:48.8929,y:42.3636}}]},5).to({state:[{t:this.shape_1,p:{rotation:-14.3914,x:54.1491,y:42.6185}},{t:this.shape,p:{rotation:-14.3914,x:54.1491,y:42.6185}}]},5).to({state:[{t:this.shape_1,p:{rotation:24.5455,x:34.9798,y:34.3744}},{t:this.shape,p:{rotation:24.5455,x:34.9798,y:34.3744}}]},5).wait(1));

	// pents
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3333CC").s().p("AolC4IAAlvIRLAAIAAFvg");
	this.shape_2.setTransform(80.5,2.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(20));

	// pentsR
	this.instance = new lib.Symbol3();
	this.instance.setTransform(113.55,0.8,1,1,-22.4778,0,0,19.6,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({regX:19.7,rotation:-12.5015,x:113.6,y:-1.6},0).wait(5).to({rotation:9.5282,x:116.7,y:5.2},0).wait(5).to({rotation:-12.5015,x:113.6,y:-1.6},0).wait(5).to({regX:19.6,rotation:-22.4778,x:113.55,y:0.8},0).wait(1));

	// shoeL
	this.instance_1 = new lib.Symbol10();
	this.instance_1.setTransform(-20.1,135.15,1,1,0,0,0,38.5,48.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape_3.setTransform(73.9348,108.4834,0.9999,0.9999,63.5175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_4.setTransform(44.6923,123.2196,0.9999,0.9999,63.5175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_5.setTransform(73.9348,108.4834,0.9999,0.9999,63.5175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_6.setTransform(44.6923,123.2196,0.9999,0.9999,63.5175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#77422C").s().p("ABkD6QgbAAgbgJQgagLgQgUIgHgGIgHgJQgNgPgQgaIgBgDQhDhvg9iKQgXg0gGgbIgBgHQgEgbAGgYQAAgEADgFIgBgDIACgDQBVEHBzB1QBYBYBoACQgJAHgNAIIgTAGQgaAKgeAAIgDgBg");
	this.shape_7.setTransform(5.8105,159.7513);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#813E0C").s().p("AgYC3Qhzh1hVkHQAEgVAOgRQAMgRAVgLQAVgKAXABQAVAAASAGQATAGACAFQAMACAHAFQAJAFAIAeQAqCBA6BoQA6BmAhg3QAgg3ARA3IACADQASA8gCAmQgDAogUAeQgNAUgVAPQhpgChXhYg");
	this.shape_8.setTransform(9.0649,154.4705);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#77422C").s().p("AB5BXQiBAEiXgRQg3gFgbgJIgHgCQgZgKgSgRQgDgDgDgEIgDgBIgCgDQEPA5CegqQB4giA2hYQACAMAAAPQgBAKgDAKQgGAcgQAbQgNAWgVATQgWARgaAFIgJADIgMACQgSAEggABIgDgBg");
	this.shape_9.setTransform(58.55,191.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#813E0C").s().p("AkdBqQgRgNgHgVQgJgTABgYQACgXAMgSQAKgTAPgNQAOgNAFABQAIgJAIgFQAJgFAdAJQCGAbB3ABQB2AAghg3Qgfg3A4AMQAAAAABAAQAAgBAAAAQABAAABABQAAAAABAAQA9ANAgAWQAhAUAQAiQAMAVACAZQg2BZh4AiQhEARhWAAQh3AAicghg");
	this.shape_10.setTransform(56.8643,183.3002);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#77422C").s().p("ABxCSIgKgBIgLgEQgSgGgbgPIgDgCQhwg/h7hYQgtgigTgUIgEgGQgRgWgHgXQgCgEAAgFIgCgDIAAgDQDOC5CdAsQB4AgBcgzQgFAMgHAMIgNAPQgTAWgcAQQgXANgcAGIgOABQgUAAgSgIg");
	this.shape_11.setTransform(-29.325,174.3704);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#813E0C").s().p("ABICvQidgsjOi5QgHgUAEgWQACgVANgUQANgTAUgKQASgLATgEQAUgEAEADQALgEAJAAQAKABAWAVQBlBbBmA9QBmA7AAg/QABhAAqAnIADACQAuApARAjQASAkgDAkQgBAZgLAWQg4AfhDAAQgqAAgvgMg");
	this.shape_12.setTransform(-28.9289,164.4956);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_5,p:{rotation:63.5175,x:73.9348,y:108.4834}},{t:this.shape_4,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_3,p:{rotation:63.5175,x:73.9348,y:108.4834}}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_6,p:{rotation:3.2571,x:47.2371,y:137.784}},{t:this.shape_5,p:{rotation:3.2571,x:48.9478,y:105.0835}},{t:this.shape_4,p:{rotation:3.2571,x:47.2371,y:137.784}},{t:this.shape_3,p:{rotation:3.2571,x:48.9478,y:105.0835}}]},5).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_5,p:{rotation:63.5175,x:73.9348,y:108.4834}},{t:this.shape_4,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_3,p:{rotation:63.5175,x:73.9348,y:108.4834}}]},5).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_6,p:{rotation:33.5179,x:-13.4842,y:119.9482}},{t:this.shape_5,p:{rotation:33.5179,x:4.4728,y:92.5649}},{t:this.shape_4,p:{rotation:33.5179,x:-13.4842,y:119.9482}},{t:this.shape_3,p:{rotation:33.5179,x:4.4728,y:92.5649}}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:39.7,regY:47.4,x:-18.9,y:133.95},0).wait(2).to({_off:true},1).wait(16));

	// shoeR
	this.instance_2 = new lib.Symbol5();
	this.instance_2.setTransform(160.3,95.2,1,1,-24.758,0,0,19.8,5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({regX:19.9,rotation:1.909,x:142.95,y:102.15},0).wait(5).to({regY:4.9,scaleX:0.9999,scaleY:0.9999,rotation:102.614,x:95.2,y:99.2},0).wait(5).to({regY:5,scaleX:1,scaleY:1,rotation:1.909,x:142.95,y:102.15},0).wait(5).to({regX:19.8,rotation:-24.758,x:160.3,y:95.2},0).wait(1));

	// kneeR
	this.instance_3 = new lib.Symbol4();
	this.instance_3.setTransform(148.05,75.9,1,1,-29.4405,0,0,11,20.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({rotation:-14.4413,x:136,y:75.85},0).wait(5).to({scaleX:0.9999,scaleY:0.9999,rotation:15.5575,x:103.6},0).wait(5).to({scaleX:1,scaleY:1,rotation:-14.4413,x:136},0).wait(5).to({rotation:-29.4405,x:148.05,y:75.9},0).wait(1));

	// kneeL
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfDjIjQhSICTlzIDQBSg");
	this.shape_13.setTransform(8.8216,80.8423,0.9127,0.9999,0,46.0808,-133.9176);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFCC99").s().p("AiwCRICSlzIDPBSIiSFzg");
	this.shape_14.setTransform(8.8216,80.8423,0.9127,0.9999,0,46.0808,-133.9176);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}},{t:this.shape_13,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}}]}).to({state:[{t:this.shape_14,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}},{t:this.shape_13,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}}]},4).to({state:[{t:this.shape_14,p:{skewX:21.8854,skewY:-158.1129,x:50.3002,y:83.4422}},{t:this.shape_13,p:{skewX:21.8854,skewY:-158.1129,x:50.3002,y:83.4422}}]},5).to({state:[{t:this.shape_14,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}},{t:this.shape_13,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}}]},5).to({state:[{t:this.shape_14,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}},{t:this.shape_13,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}}]},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.6,-15.8,297.1,216.60000000000002);


(lib.legwalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.walk();
	this.instance.setTransform(148.6,118.55,1,1,0,0,0,90,82.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(1,1,1).p("AHqAhIAAhBIvTAAIAABB");
	this.shape.setTransform(141.475,3.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legwalk, new cjs.Rectangle(0,-1,297.1,226.5), null);


(lib.open_smail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.open_mouth();
	this.instance.setTransform(0,0.15,0.284,0.4041,-14.9965,0,0,69.8,25.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.open_smail, new cjs.Rectangle(-22.1,-15.1,44.2,30.4), null);


(lib.hairpinocchioboy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.hair();
	this.instance.setTransform(83,45.8,1,1,0,0,0,83,45.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAGhlQAHBsgUBf");
	this.shape.setTransform(137.911,78.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hairpinocchioboy, new cjs.Rectangle(0,0,166.1,91.6), null);


(lib.facewhitsmail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.sed();
	this.instance.setTransform(85.7,76.35,1.7623,2.041,-135.0003,0,0,4.8,3.7);

	this.instance_1 = new lib.face_clean();
	this.instance_1.setTransform(66.45,-70.6,1,1,0,0,180,66.5,-70.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.facewhitsmail, new cjs.Rectangle(0,0,141.3,103.7), null);


(lib.blink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.open_eye();
	this.instance.setTransform(9.2,13.2,1,1,0,0,0,9.2,13.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFBD97").ss(1,1,1).p("AhLgOQBLA8BMg8");
	this.shape.setTransform(9.25,7.1813);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("ABMhnQADAGACAGQAMAdAAAjQAAA2gbAmQgbAngnAAQgmAAgbgnQgbgmAAg2QAAgjALgdQADgGADgG");
	this.shape_1.setTransform(9.25,16.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFBD97").ss(0.1,1,1).p("AhLAcQAFgJAFgJQAbglAmAAQAnAAAbAlQAFAJAFAJ");
	this.shape_2.setTransform(9.25,2.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAAANIgDAAIgEgCQgEgCgCgFQgBgEABgDQABgEAEgCQAEgDAEAAIAAgBQAGACADACQAEADABAFQABAEgDADQgDAFgGACIgDABIAAgBg");
	this.shape_3.setTransform(6.5518,20.0083);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhABBQgcgmAAg2QAAgjALgdIAGgMQBLA9BMg9IAFAMQAMAdAAAjQAAA2gbAmQgbAngnAAQglAAgbgngAgjAdQgDADgBAEQgCAEACAEQACAEADACIAEACIADABIAEgBQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgCgIgCIAAABIgBAAQgDAAgEACg");
	this.shape_4.setTransform(9.25,16.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFBD97").s().p("AhLANQAFgJAGgIQAbgnAlAAQAnAAAbAnQAFAIAFAJQgmAfgmAAQglAAgmgfg");
	this.shape_5.setTransform(9.25,4.3563);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFBD97").ss(1,1,1).p("AhLgdQBKB2BNh2");
	this.shape_6.setTransform(9.25,8.6108);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhABBQgcgmAAg2QAAgjALgdIAGgMQBKB1BNh1IAFAMQAMAdAAAjQAAA2gbAmQgbAngnAAQglAAgbgngAgjAdQgDADgBAEQgCAEACAEQACAEADACIAEACIADABIAEgBQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgCgIgCIAAABIgBAAQgDAAgEACg");
	this.shape_7.setTransform(9.25,16.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFBD97").s().p("AhLAAQAFgKAGgIQAbgnAlAAQAnAAAbAnQAFAIAFAKQgnA6glAAQgmAAglg6g");
	this.shape_8.setTransform(9.25,5.7858);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFBD97").ss(1,1,1).p("AhhgQQADACADACQBcA7Bhg9");
	this.shape_9.setTransform(9.25,12.6094);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(0.1,1,1).p("ABfhMQgFAIAAANQAAA3gbAmQgbAngmAAQgmAAgbgnQgbgmAAg3QAAgKABgJ");
	this.shape_10.setTransform(9.5,18.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhDAmQgbgmAAg3IABgTQBcA8Bgg+QgFAIAAANQAAA3gbAmQgbAnglAAQgnAAgbgngAglACQgEACgBAEQgBAEABAEQACAFAEACIADACIAEAAIADAAQAGgCAEgFQACgDgBgFQAAgFgEgDQgDgCgHgBIAAABIgBAAQgEAAgDACg");
	this.shape_11.setTransform(9.5,18.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFBD97").s().p("AhbAqIgGgEIAMgcIAFgKQAMgaAEgGQAbgmAlAAQAnAAAbAmQADAFALAaIARApQgxAfgwAAQgtAAgugdg");
	this.shape_12.setTransform(9.25,7.1344);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFBD97").ss(1,1,1).p("AhhgmQADACADACQBbCTBiiV");
	this.shape_13.setTransform(9.25,14.8325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhDAmQgbgmAAg3IABgTQBaCUBiiWQgFAIAAANQAAA3gbAmQgbAnglAAQgnAAgbgngAglACQgEACgBAEQgBAEABAEQACAFAEACIADACIAEAAIADAAQAGgCAEgFQACgDgBgFQAAgFgEgDQgDgCgHgBIAAABIgBAAQgEAAgDACg");
	this.shape_14.setTransform(9.5,18.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFBD97").s().p("AhbAUIgGgEIAMgbIAFgKQAMgcAEgFQAbgnAlAAQAnAAAbAnQADAFALAaIARApQgxBMgwAAQguAAgthKg");
	this.shape_15.setTransform(9.25,9.3575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FFBD97").ss(0.1,1,1).p("ABehHQgDAGAAAJQAAA3gbAmQgbAnglAAQgnAAgbgnQgbgmAAg3QAAgKABgJ");
	this.shape_16.setTransform(9.3625,18.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#FFBD97").ss(1,1,1).p("Ahhg2QADACADACQAZA7AaAaQAIAIAIAFQA4AjA/iCQABgDACgC");
	this.shape_17.setTransform(9.25,16.4929);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAFAHIgDgBIgDgCQgDgCgCgDIgBgFQAHAHAIAFIgCABIgBAAg");
	this.shape_18.setTransform(5.9373,20.6952);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFBD97").s().p("AhABdQgcgmAAg3IABgSQAZA7AaAbQgagbgZg7IgGgEIAMgcIAFgKQAMgbAEgGQAbgnAlAAQAnAAAbAnQADAFALAaIARAqIgCAGIgBACIAAAAIgBACIAAAAQgwBhgtABIAAAAIAAAAQgMAAgMgHIAAAAQgIgFgIgIIABAEQACAFADABIAEADIADAAIADAAIAAAAQAMAHAMAAIAAAAIAAAAQAtgBAwhhIAAAAIABgCIAAAAIABgCQgCAGAAAIQAAA3gbAmQgbAngnAAQglAAgbgng");
	this.shape_19.setTransform(9.25,13.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_6}]},5).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_3},{t:this.shape_10},{t:this.shape_9}]},5).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},6).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},5).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},6).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},5).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},5).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_6}]},6).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_6}]},5).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},5).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},18).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1,21.5,28.5);


(lib.Scene_1_head = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// head
	this.instance = new lib.face_clean();
	this.instance.setTransform(627.75,221.2,1,1,0,0,0,66.5,-70.6);

	this.instance_1 = new lib.open_smail();
	this.instance_1.setTransform(615.4,374.1,1.2459,1.2459);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},85).to({state:[]},295).wait(219));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eyeR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeR
	this.instance = new lib.close_blink();
	this.instance.setTransform(621.75,337.25,0.9325,0.9325,0,0,0,20.5,15.1);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(621.45,337.35,0.8113,0.8113,0,0,0,9.3,13.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},74).to({state:[]},306).wait(219));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eyeL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeL
	this.instance = new lib.close_blink();
	this.instance.setTransform(582.7,345,0.9325,0.9325,0,-14.9974,165.0026,15.7,13.8);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(582.9,344.4,0.8384,0.8384,-14.9974,0,0,9.4,13.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},74).to({state:[]},306).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.punocchioinlove = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_101
	this.ikNode_27 = new lib.arm8();
	this.ikNode_27.name = "ikNode_27";
	this.ikNode_27.setTransform(14.75,250.65,1,1,158.7954,0,0,-0.1,61.6);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_27).wait(32));

	// Armature_103
	this.ikNode_30 = new lib.arm3();
	this.ikNode_30.name = "ikNode_30";
	this.ikNode_30.setTransform(150.1,357.95,1,1,-14.9992,0,0,10.8,13.7);

	this.ikNode_29 = new lib.arm8();
	this.ikNode_29.name = "ikNode_29";
	this.ikNode_29.setTransform(156.1,279.95,1,1,165.0008,0,0,7.2,57.7);

	this.ikNode_24 = new lib.Tshirt();
	this.ikNode_24.name = "ikNode_24";
	this.ikNode_24.setTransform(101,161.9,1,1,0,0,0,95.5,130.4);

	this.ikNode_37 = new lib.arm7();
	this.ikNode_37.name = "ikNode_37";
	this.ikNode_37.setTransform(14.8,249.85,1.2308,1.0323,-8.2173,0,0,3.1,41.6);

	this.ikNode_28 = new lib._2();
	this.ikNode_28.name = "ikNode_28";
	this.ikNode_28.setTransform(12.7,321,1,1,44.9994,0,0,-0.7,0.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_28},{t:this.ikNode_37},{t:this.ikNode_24},{t:this.ikNode_29},{t:this.ikNode_30}]}).wait(32));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AC5BlQgQgBgOgIQgVgMgVgfQgQgXgFgPIAAAAQgHgXAKgSQADgIAHgFIAFgEQAKgHAMgBQAYgDAUAQQAHAFAEgBQADAAAGgGQANgNATgCQAUgDAPAJQAQAKAGASQAGATgIAQQgEAIgJALIgQARIgSAaQgLAQgLAGQgLAHgPAAIgDAAgAi9AzQgOgFgWgPQgggUgLgMQgWgXAFgaQACgOALgLQAKgKAOgEQAcgHAZAVIAHAGQAEACAEAAQAEgBAGgIQAMgOARgGQASgHARAEQASAEAMAQQALAQgCARQgCANgMAPIgUAXIgWAdQgNAQgOAEQgHADgHAAQgMAAgNgGg");
	this.shape.setTransform(167.6944,115.1547);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AC/B7QgQgBgOgIQgVgMgVgeQgJgNgFgKIgDgDQgZgZgGgZQgEgPADgPQACgQAKgLQASgTAdACQAYABAWASQAMAJALANIAHgGQAQgLATgFQAlgKAXATQASAOACAYQACATgNAWQgIAOgYAVQgOALgLAFIgKAPQgLAPgLAHQgLAGgOAAIgEAAgAitBNQgGABgHAAQgWgBgggcIgpgiQgUgPgIgNQgIgMgBgRQgEggAQgXQAJgMAOgGQAOgHAOACQAUABANARIABAAQANAGAQALQAMAJAKAKIAHgJQALgNAKgIIAQgKIAIgEIAHgFQAPgJARACQASACAMALQAMAMADARQACASgIAOQgDAGgGAHIgLALIgCADQgCAMgLAMIgUAZIgWAcQgNAQgOAFQgHACgHAAQgHAAgIgCg");
	this.shape_1.setTransform(167.0748,112.9368);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},10).to({state:[{t:this.shape}]},10).wait(12));

	// Layer_1
	this.instance = new lib.nose();
	this.instance.setTransform(163.05,132.8,1,1,-8.2483,0,0,1.5,1.7);

	this.ikNode_32 = new lib.hat();
	this.ikNode_32.name = "ikNode_32";
	this.ikNode_32.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_1 = new lib.hair();
	this.instance_1.setTransform(154.4,73.95,1,1,0,0,0,83,45.8);

	this.instance_2 = new lib.open_smail();
	this.instance_2.setTransform(150.75,151.6,1.2459,1.2459,0,0,180);

	this.ikNode_31 = new lib.face_clean();
	this.ikNode_31.name = "ikNode_31";
	this.ikNode_31.setTransform(138.4,-1.3,1,1,0,0,180,66.5,-70.6);

	this.instance_3 = new lib.pents_only();
	this.instance_3.setTransform(54.3,281.05,1,1,8.1949,0,0,12.3,-12.4);

	this.instance_4 = new lib.legshoe();
	this.instance_4.setTransform(118.75,392.25,0.9999,0.9999,5.2167,0,0,14.1,-5);

	this.instance_5 = new lib.legshoe();
	this.instance_5.setTransform(53.6,402,0.9999,0.9999,0,-7.5043,172.4957,9.4,4.5);

	this.instance_6 = new lib.thigh();
	this.instance_6.setTransform(52.35,384.15,0.9999,0.9999,0,14.9746,-165.0254,13.2,19.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AAGhlQAHBsgUBf");
	this.shape_2.setTransform(209.311,106.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#3333CC").ss(1,1,1).p("AHqAhIAAhBIvTAAIAABB");
	this.shape_3.setTransform(84.325,267.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#3333CC").ss(12,1,1).p("AjFk3IAWJvIF1gQIgVpf");
	this.shape_4.setTransform(110.9,338.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3333CC").s().p("ABEh/IotAAIAAlvIPTAAIAAFvIgvAAIAVJfIl3APg");
	this.shape_5.setTransform(84.325,320.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AgSA2QgjgKgRghQgLgVAHgSQAIgRAZgIQAdgJAeAJQAeAJASAZQAMAQgBAPQgBAMgJAKQgGAHgNAHQgUAKgUAAQgNAAgNgEg");
	this.shape_6.setTransform(144.753,111.8346);

	this.instance_7 = new lib.hat();
	this.instance_7.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.ikNode_24_1 = new lib.Tshirt();
	this.ikNode_24_1.name = "ikNode_24_1";
	this.ikNode_24_1.setTransform(152.6,217.4,1,1,0,0,0,147.1,185.9);

	this.instance_8 = new lib.face_clean();
	this.instance_8.setTransform(138.4,-1.3,1,1,0,0,180,66.5,-70.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.ikNode_31},{t:this.instance_2},{t:this.instance_1},{t:this.ikNode_32},{t:this.instance}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_2},{t:this.shape_3},{t:this.shape_4},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_8},{t:this.instance_2},{t:this.ikNode_24_1},{t:this.instance_1},{t:this.instance_7},{t:this.instance}]},31).wait(1));

	// Layer_2
	this.instance_9 = new lib.thigh();
	this.instance_9.setTransform(113.45,360.1,0.9999,0.9999,0,3.9973,-176.0027,16.1,-1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(32));

	// Layer_5
	this.instance_10 = new lib.arm7();
	this.instance_10.setTransform(156.15,237.4,1.0894,1.0894,-21.7501,0,0,12.1,10.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(32));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.7,0,258.2,501.2);


(lib.punocchionormal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.blink();
	this.instance.setTransform(147,99.95,0.8113,0.8113,0,0,180,9.2,0);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(189.25,109.9,0.7819,0.7819,0,23.7045,-156.2955,10.6,0.8);

	this.instance_2 = new lib.nose();
	this.instance_2.setTransform(163.55,132.3,1,1,-8.2483,0,0,1.5,1.7);

	this.instance_3 = new lib.hat();
	this.instance_3.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_4 = new lib.hair();
	this.instance_4.setTransform(154.4,73.95,1,1,0,0,0,83,45.8);

	this.instance_5 = new lib.Tshirt();
	this.instance_5.setTransform(112,160.8,1,1,0,0,0,106.5,129.3);

	this.instance_6 = new lib.open_smail();
	this.instance_6.setTransform(150.75,151.6,1.2459,1.2459,0,0,180);

	this.instance_7 = new lib.face_clean();
	this.instance_7.setTransform(138.4,-1.3,1,1,0,0,180,66.5,-70.6);

	this.instance_8 = new lib.pents_only();
	this.instance_8.setTransform(54.3,281.05,1,1,8.1949,0,0,12.3,-12.4);

	this.instance_9 = new lib.CachedBmp_22();
	this.instance_9.setTransform(146.05,205.5,0.5,0.5);

	this.instance_10 = new lib.arm3();
	this.instance_10.setTransform(12.95,320.2,1,1,0,14.426,-165.574,16.1,4);

	this.instance_11 = new lib.legshoe();
	this.instance_11.setTransform(118.75,392.25,0.9999,0.9999,5.2167,0,0,14.1,-5);

	this.instance_12 = new lib.legshoe();
	this.instance_12.setTransform(53.6,402,0.9999,0.9999,0,-7.5043,172.4957,9.4,4.5);

	this.instance_13 = new lib.thigh();
	this.instance_13.setTransform(52.35,384.15,0.9999,0.9999,0,14.9746,-165.0254,13.2,19.6);

	this.instance_14 = new lib.CachedBmp_18();
	this.instance_14.setTransform(4.3,169.5,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_17();
	this.instance_15.setTransform(34.8,96.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(2));

	// Layer_2
	this.instance_16 = new lib.thigh();
	this.instance_16.setTransform(113.45,360.1,0.9999,0.9999,0,3.9973,-176.0027,16.1,-1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.3,0,236.2,501.2);


(lib.PINOCCHIOmc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_23
	this.ikNode_2 = new lib.Tshirt();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(195.8,160.8,1,1,0,0,0,106.5,129.3);

	this.ikNode_3 = new lib.legwalk();
	this.ikNode_3.name = "ikNode_3";
	this.ikNode_3.setTransform(184.05,288.05,1,1,0,0,0,157.3,23.9);

	this.ikNode_5 = new lib.handd3();
	this.ikNode_5.name = "ikNode_5";
	this.ikNode_5.setTransform(235.2,210.8,0.9999,0.9999,22.7084,0,0,0,0.4);

	this.ikNode_9 = new lib.handd();
	this.ikNode_9.name = "ikNode_9";
	this.ikNode_9.setTransform(118.7,183.15,0.9999,0.9999,-22.0769,0,0,53.6,12.8);

	this.ikNode_8 = new lib.arm();
	this.ikNode_8.name = "ikNode_8";
	this.ikNode_8.setTransform(87.95,247.4,0.9999,0.9999,-39.9681,0,0,31.3,2.5);

	this.ikNode_12 = new lib.fingers();
	this.ikNode_12.name = "ikNode_12";
	this.ikNode_12.setTransform(101.95,312.55,0.9999,0.9999,-68.4662,0,0,25.6,0.3);

	this.ikNode_14 = new lib.handd2();
	this.ikNode_14.name = "ikNode_14";
	this.ikNode_14.setTransform(236.9,278.9,0.9999,0.9999,22.5562,0,0,0.2,0.1);

	this.ikNode_16 = new lib.arm3();
	this.ikNode_16.name = "ikNode_16";
	this.ikNode_16.setTransform(255.9,332.6,0.9997,0.9997,0,-15.5674,164.4326,14.2,4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_16,p:{regY:4.7,skewX:-15.5674,skewY:164.4326,x:255.9,y:332.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:22.5562,x:236.9,y:278.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9999,scaleY:0.9999,rotation:-68.4662,x:101.95,y:312.55,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.5,scaleX:0.9999,scaleY:0.9999,rotation:-39.9681,x:87.95,y:247.4}},{t:this.ikNode_9,p:{scaleX:0.9999,scaleY:0.9999,rotation:-22.0769,x:118.7,y:183.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:22.7084,x:235.2,y:210.8,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]}).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-20.2686,skewY:159.7314,x:266.05,y:328.4,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:12.4523,x:237.85,y:278.8,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-77.7667,x:112.2,y:309.4,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-49.2681,x:87.85,y:247.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0684,x:118.65,y:183.1,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:21.872,x:234.95,y:210.7,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-24.9698,skewY:155.0302,x:275.2,y:322.75,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:2.3502,x:238.75,y:278.85,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-87.0677,x:121.9,y:304.6,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-58.5688,x:87.85,y:247.5}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0589,x:118.6,y:183.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:21.0366,x:234.95,y:210.85,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-29.6713,skewY:150.3287,x:283.2,y:315.7,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-7.747,x:239.65,y:278.85,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-96.364,x:130.7,y:298.3,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9998,scaleY:0.9998,rotation:-67.868,x:87.75,y:247.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0507,x:118.6,y:183.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0.1,rotation:20.2007,x:234.95,y:210.95,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-34.3734,skewY:145.6266,x:289.9,y:307.4,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-17.8504,x:240.6,y:278.85,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-105.6642,x:138.4,y:290.7,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-77.1694,x:87.9,y:247.55}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0429,x:118.55,y:183.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:19.3654,x:234.75,y:211,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-39.0749,skewY:140.9251,x:294.95,y:298.3,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9998,scaleY:0.9998,rotation:-27.953,x:241.4,y:278.8,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-114.965,x:144.6,y:282,regY:0.2,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-86.4701,x:87.85,y:247.5}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0343,x:118.6,y:183.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:18.5306,x:234.65,y:211.05,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-35.0981,skewY:144.9019,x:289.9,y:301.1,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9998,scaleY:0.9998,rotation:-23.9755,x:237.85,y:277.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-94.9265,x:135.65,y:289.35,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-76.62,x:85.65,y:245.7}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-20.2335,x:118.45,y:182.4,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:22.8299,x:236.15,y:209.85,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-31.1214,skewY:148.8786,x:284.55,y:303.3,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-19.998,x:234.3,y:276.5,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-74.8918,x:125.2,y:295.6,regY:0.3,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-66.7708,x:83.4,y:243.9}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.4327,x:118.1,y:181.65,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:27.1282,x:237.6,y:208.5,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-27.1439,skewY:152.8561,x:278.9,y:304.9,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-16.0214,x:230.65,y:274.65,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-54.8539,x:113.6,y:299.9,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-56.9224,x:81.2,y:241.95}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-16.6315,x:117.85,y:180.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:31.428,x:239.1,y:207.25,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-23.1685,skewY:156.8315,x:273.1,y:306.05,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-12.0441,x:227,y:272.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-34.8152,x:100.9,y:302.6,regY:0.2,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-47.0732,x:79.1,y:239.95}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.8301,x:117.75,y:180,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:35.7291,x:240.45,y:205.75,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-19.19,skewY:160.81,x:267.1,y:306.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-8.0674,x:223.35,y:269.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.776,x:87.95,y:303.45,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-37.2251,x:76.95,y:238}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.029,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:40.0263,x:241.75,y:204.3,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-9.927,skewY:170.073,x:258.7,y:314.2,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:1.1919,x:221.5,y:270.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-11.9283,x:84.7,y:303.9,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-34.3772,x:77.15,y:238}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.1241,x:117.45,y:179.25,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:40.5829,x:240.55,y:205.6,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-0.6638,skewY:179.3362,x:249.35,y:320.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:10.4552,x:219.65,y:271.95,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-9.0805,x:81.5,y:304.25,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-31.529,x:77.15,y:238.05}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.2193,x:117.45,y:179.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:41.1396,x:239.4,y:206.8,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:8.5969,skewY:-171.4031,x:239.25,y:325.8,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:19.72,x:217.75,y:272.95,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-6.2339,x:78.35,y:304.5,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-28.6816,x:77.2,y:238.2}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.3137,x:117.4,y:179.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:41.6953,x:238.1,y:208,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:17.8602,skewY:-162.1398,x:228.5,y:329.45,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:28.9836,x:215.75,y:273.95,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-3.3842,x:75.05,y:304.45,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-25.8337,x:77.35,y:238.2}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.4089,x:117.4,y:179.1,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:42.2519,x:236.8,y:209.1,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:27.1236,skewY:-152.8764,x:217.4,y:331.75,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:38.2469,x:213.8,y:274.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-0.536,x:71.9,y:304.3,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-22.9867,x:77.35,y:238.25}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.5041,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:42.8089,x:235.45,y:210.2,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:36.3887,skewY:-143.6113,x:206.2,y:332.4,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:47.5117,x:211.75,y:275.65,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:2.3056,x:68.65,y:304,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-20.1367,x:77.55,y:238.35}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.5979,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:43.3644,x:234.05,y:211.35,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.7,skewX:45.6525,skewY:-134.3475,x:195.25,y:331.5,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:56.7753,x:209.7,y:276.6,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:5.1547,x:65.5,y:303.5,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-17.2889,x:77.5,y:238.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.6939,x:117.4,y:179.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:43.921,x:232.55,y:212.35,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:54.9158,skewY:-125.0842,x:184.4,y:329.25,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:66.0398,x:207.65,y:277.25,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:8.0017,x:62.35,y:302.85,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-14.4403,x:77.65,y:238.4}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.7885,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:44.4769,x:231.15,y:213.35,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:64.1805,skewY:-115.8195,x:174.35,y:325.55,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.4,scaleX:0.9998,scaleY:0.9998,rotation:75.3025,x:205.65,y:278.1,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:10.8507,x:59.3,y:302.1,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-11.5922,x:77.7,y:238.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.8825,x:117.35,y:179.05,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:45.0334,x:229.75,y:214.3,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:46.326,skewY:-133.674,x:196.1,y:335.85,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:55.056,x:209,y:280.35,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.7624,x:69.95,y:304.55,regY:0.3,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-20.9276,x:78,y:238.8}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.0886,x:117.4,y:179.3,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:40.8544,x:228.3,y:215.05,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:28.4725,skewY:-151.5275,x:219.55,y:339,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9998,scaleY:0.9998,rotation:34.8069,x:212.4,y:282.4,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-38.3797,x:81.1,y:305.25,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-30.2622,x:78.35,y:239.05}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.2943,x:117.45,y:179.45,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:36.6765,x:227.05,y:215.9,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:10.6204,skewY:-169.3796,x:242.2,y:334.65,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:14.5601,x:216.05,y:284.1,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-62.9966,x:91.95,y:304.3,regY:0.3,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-39.5981,x:78.5,y:239.3}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.4992,x:117.45,y:179.6,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:32.4963,x:225.7,y:216.65,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-7.2292,skewY:172.7708,x:261.6,y:323.75,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-5.6832,x:219.6,y:285.25,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-87.6121,x:102.6,y:301.35,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-48.9327,x:78.75,y:239.6}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.7043,x:117.5,y:179.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:28.3168,x:224.3,y:217.4,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-25.0806,skewY:154.9194,x:275.95,y:307.6,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:-25.9312,x:223.1,y:286.1,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-112.2247,x:112.6,y:296.9,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-58.2688,x:79,y:239.85}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.9105,x:117.65,y:179.9,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:24.1383,x:223,y:217.95,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-42.9334,skewY:137.0666,x:283.65,y:288.45,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-46.1798,x:226.7,y:286.6,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-136.8423,x:121.55,y:291.1,regY:0.2,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-67.6028,x:79.35,y:240.1}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-15.116,x:117.65,y:180.05,regX:53.7}},{t:this.ikNode_5,p:{regX:0.1,rotation:19.9595,x:221.65,y:218.75,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-36.6401,skewY:143.3599,x:282.65,y:293.8,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.4,scaleX:0.9998,scaleY:0.9998,rotation:-40.8036,x:226.15,y:286.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-133.5115,x:118.9,y:295.25,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-63.3603,x:80.5,y:241.35}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-16.1168,x:117.65,y:180.6,regX:53.6}},{t:this.ikNode_5,p:{regX:0.1,rotation:20.5371,x:221.75,y:218.65,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-30.3461,skewY:149.6539,x:281.15,y:299.05,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-35.427,x:225.55,y:286.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-130.182,x:116,y:299.1,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-59.1184,x:81.65,y:242.6}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-17.1178,x:117.75,y:181.25,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:21.1147,x:221.75,y:218.55,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-24.0516,skewY:155.9484,x:279.2,y:304.15,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-30.0499,x:225,y:286.6,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-126.8508,x:113,y:302.5,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-54.8744,x:82.95,y:243.65}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.1186,x:118.05,y:181.7,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:21.6928,x:221.85,y:218.5,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-17.7568,skewY:162.2432,x:276.65,y:309.2,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:-24.674,x:224.3,y:286.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-123.5215,x:109.7,y:305.85,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-50.6325,x:84.05,y:244.85}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-19.1199,x:118.1,y:182.25,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:22.2713,x:221.9,y:218.4,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-11.465,skewY:168.535,x:273.75,y:313.95,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-19.2977,x:223.8,y:286.5,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-120.1907,x:106.35,y:308.7,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-46.3883,x:85.3,y:246}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-20.1206,x:118.2,y:182.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:22.8468,x:222.1,y:218.4,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-5.1704,skewY:174.8296,x:270.35,y:318.5,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-13.9215,x:223.2,y:286.55,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-116.8611,x:102.95,y:311.15,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-42.1457,x:86.6,y:247.1}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-21.1212,x:118.35,y:183.4,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:23.425,x:222.2,y:218.35,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:1.1195,skewY:-178.8805,x:266.6,y:322.7,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-8.5456,x:222.65,y:286.35,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-113.5305,x:99.35,y:313.45,regY:0.2,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-37.9036,x:87.7,y:248.15}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.1202,x:118.55,y:183.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:24.0025,x:222.3,y:218.25,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:66.1515,skewY:-113.8485,x:201.7,y:333.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:56.4811,x:215.9,y:278.6,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-38.5023,x:86.65,y:309.95,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-30.8082,x:83.05,y:243.95}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.4585,x:117.8,y:181.75,regX:53.6}},{t:this.ikNode_5,p:{regX:0.1,rotation:38.1573,x:232.45,y:212.45,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.7,skewX:34.6841,skewY:-145.3159,x:238.2,y:335.95,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:25.014,x:221.4,y:281.75,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-64.4439,x:102.85,y:308.4,regY:0.2,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-43.7842,x:84.75,y:244.85}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-19.9623,x:117.75,y:181.75,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:31.5096,x:230,y:214.05,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:3.2149,skewY:-176.7851,x:269.6,y:321.45,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-6.449,x:226.9,y:283.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-90.3795,x:118.5,y:303.45,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-56.7608,x:86.45,y:245.7}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-21.4648,x:117.8,y:181.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:24.8622,x:227.6,y:215.5,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-28.2467,skewY:151.7533,x:288.45,y:294.55,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.4,scaleX:0.9999,scaleY:0.9999,rotation:-37.9168,x:232.4,y:284.6,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-116.3218,x:132.25,y:295.7,regY:0.2,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-69.7366,x:88.15,y:246.6}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.9669,x:117.9,y:181.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:18.2146,x:225.1,y:216.9,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-59.7139,skewY:120.2861,x:290.65,y:263.7,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-69.3845,x:237.6,y:284.6,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-142.2619,x:144,y:285.2,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-82.7136,x:89.9,y:247.25}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-24.4701,x:117.9,y:181.75,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:11.567,x:222.6,y:218.15,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).wait(1));

	// Layer_1
	this.instance = new lib.blink();
	this.instance.setTransform(267.15,121.9,0.8383,0.8383,0,14.9959,-165.0041,9.2,13.3);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(228.6,114.85,0.8113,0.8113,0,0,180,9,13.3);

	this.instance_2 = new lib.nose();
	this.instance_2.setTransform(269.95,144.85,1,1,0,0,0,24.5,13.8);

	this.instance_3 = new lib.hat();
	this.instance_3.setTransform(509.85,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_4 = new lib.hairpinocchioboy();
	this.instance_4.setTransform(238.3,73.95,1,1,0,0,0,83,45.8);

	this.ikNode_7 = new lib.facewhitsmail();
	this.ikNode_7.name = "ikNode_7";
	this.ikNode_7.setTransform(195.95,160.8,1,1,0,0,0,40.1,91.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_7},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(38));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(26.8,0,297.09999999999997,489.7);


(lib.hair_girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#5D3300").ss(10,1,1).p("AEIhgIoPDB");
	this.shape.setTransform(27.225,94.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib.blink();
	this.instance.setTransform(35.5,62.85,0.7946,0.7946,-7.2492,0,0,9.4,2.1);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(75.9,67.1,0.8162,0.8162,10.2398,0,0,9.2,7);

	this.instance_2 = new lib.CachedBmp_12();
	this.instance_2.setTransform(-7.8,-21.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_2
	this.instance_3 = new lib.face_clean();
	this.instance_3.setTransform(75.05,76.1,1,1,14.9992,0,0,62.4,51.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hair_girl, new cjs.Rectangle(-7.8,-21,181.5,264), null);


(lib.Scene_1_simboles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// simboles
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(1,1,1).p("AnpAhIAAhBIPTAAIAABB");
	this.shape.setTransform(681.825,489.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AnpC4IAAlvIPTAAIAAFvg");
	this.shape_1.setTransform(681.825,511.675);

	this.instance = new lib.punocchionormal();
	this.instance.setTransform(793.85,463.7,1,1,0,0,0,212.6,250);
	this.instance._off = true;

	this.instance_1 = new lib.PINOCCHIOmc();
	this.instance_1.setTransform(1039.55,475.05,1,1,0,0,0,438.4,244.2);
	this.instance_1._off = true;

	this.instance_2 = new lib.punocchioinlove();
	this.instance_2.setTransform(983.8,462.7,1,1,0,0,0,396.2,250);

	this.instance_3 = new lib.punocchiosed();
	this.instance_3.setTransform(881.95,459,1,1,0,0,0,212.6,250);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},380).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},33).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance}]},17).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_3}]},1).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(380).to({_off:false},0).to({_off:true},5).wait(116).to({_off:false,regX:396.2,x:984.25,y:462.65},0).to({_off:true},8).wait(17).to({_off:false,regX:212.6,x:800.2,y:459.4},0).wait(1).to({regX:118.3,regY:250.6,x:710.15,y:460},0).wait(1).to({x:714.4},0).wait(1).to({x:718.65},0).wait(1).to({x:722.9},0).wait(1).to({x:727.15},0).wait(1).to({x:731.4},0).wait(1).to({x:735.65},0).wait(1).to({x:739.9},0).wait(1).to({x:742},0).wait(1).to({x:744.15},0).wait(1).to({x:746.25},0).wait(1).to({x:748.4},0).wait(1).to({x:750.5},0).wait(1).to({x:752.65},0).wait(1).to({x:754.75},0).wait(1).to({x:756.9},0).wait(1).to({x:759.45},0).wait(1).to({x:762},0).wait(1).to({x:764.6},0).wait(1).to({x:767.15},0).wait(1).to({x:769.75},0).wait(1).to({x:772.3},0).wait(1).to({x:774.9},0).wait(1).to({x:776.4},0).wait(1).to({x:777.9},0).wait(1).to({x:779.4},0).wait(1).to({x:780.9},0).wait(1).to({x:782.4},0).wait(1).to({x:783.9},0).wait(1).to({x:785.4},0).wait(1).to({x:786.9},0).wait(3).to({_off:true},1).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(385).to({_off:false},0).wait(1).to({regX:175.3,regY:250.3,x:782.9,y:481.15},0).wait(1).to({x:789.85},0).wait(1).to({x:797.2},0).wait(1).to({x:805},0).wait(1).to({x:813.25},0).wait(1).to({x:821.95},0).wait(1).to({x:831.05},0).wait(1).to({x:840.65},0).wait(1).to({x:855.9},0).wait(1).to({x:871.8},0).wait(1).to({x:888.4},0).wait(1).to({x:905.7},0).wait(1).to({x:923.65},0).wait(1).to({x:943.15},0).wait(1).to({x:967},0).wait(1).to({x:991.65},0).wait(1).to({x:1017.15},0).wait(1).to({x:1045.65},0).wait(1).to({x:1080.35},0).wait(1).to({x:1116.15},0).wait(1).to({x:1152.9},0).wait(1).to({x:1190.75},0).wait(1).to({x:1229.05},0).wait(1).to({x:1268.4},0).wait(1).to({x:1308.75},0).wait(1).to({x:1342.15},0).wait(1).to({x:1375.55},0).wait(1).to({x:1408.65},0).wait(3).to({regX:438.4,regY:244.2,x:1752.95,y:474.4},0).wait(1).to({x:53.8,y:476.1},0).wait(33).to({x:60.2,y:485.75},0).wait(1).to({regX:175.3,regY:250.3,x:-197.5,y:491.75},0).wait(1).to({x:-191.8,y:491.65},0).wait(1).to({x:-185.6,y:491.55},0).wait(1).to({x:-179.05,y:491.5},0).wait(1).to({x:-172.1,y:491.4},0).wait(1).to({x:-164.75,y:491.25},0).wait(1).to({x:-157,y:491.15},0).wait(1).to({x:-148.85,y:491.05},0).wait(1).to({x:-140.25,y:490.9},0).wait(1).to({x:-131.3,y:490.8},0).wait(1).to({x:-121.95,y:490.65},0).wait(1).to({x:-112.2,y:490.5},0).wait(1).to({x:-102.05,y:490.35},0).wait(1).to({x:-91.45,y:490.2},0).wait(1).to({x:-80.5,y:490.05},0).wait(1).to({x:-69.15,y:489.9},0).wait(1).to({x:-57.4,y:489.7},0).wait(1).to({x:-45.25,y:489.55},0).wait(1).to({x:-32.65,y:489.35},0).wait(1).to({x:-19.7,y:489.15},0).wait(1).to({x:-6.35,y:488.95},0).wait(1).to({x:7.4,y:488.75},0).wait(1).to({x:21.6,y:488.55},0).wait(1).to({x:36.15,y:488.35},0).wait(1).to({x:51.1,y:488.15},0).wait(1).to({x:66.5,y:487.9},0).wait(1).to({x:82.25,y:487.7},0).wait(1).to({x:98.4,y:487.45},0).wait(1).to({x:114.95,y:487.2},0).wait(1).to({x:131.95,y:486.95},0).wait(1).to({x:149.3,y:486.7},0).wait(1).to({x:167.05,y:486.45},0).wait(1).to({x:185.2,y:486.2},0).wait(1).to({x:203.75,y:485.9},0).wait(1).to({x:222.7,y:485.65},0).wait(1).to({x:242.1,y:485.35},0).wait(1).to({x:261.85,y:485.1},0).wait(1).to({x:282,y:484.8},0).wait(1).to({x:302.6,y:484.5},0).wait(1).to({x:323.55,y:484.2},0).wait(1).to({x:344.95,y:483.85},0).wait(1).to({x:366.7,y:483.55},0).wait(1).to({x:388.85,y:483.25},0).wait(1).to({x:411.45,y:482.9},0).wait(1).to({x:434.4,y:482.55},0).wait(1).to({x:457.8,y:482.25},0).wait(1).to({x:481.55,y:481.9},0).wait(1).to({x:505.7,y:481.55},0).wait(1).to({x:509.8,y:481.5},0).wait(1).to({_off:true},1).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.PINOCCHIOgirl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_7
	this.instance = new lib.arm3();
	this.instance.setTransform(206,322.75,1,1,-89.9991,0,0,16.2,5.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_6
	this.instance_1 = new lib._2();
	this.instance_1.setTransform(43.65,322.5,1,1,89.9991,0,0,4.2,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_5
	this.instance_2 = new lib.arm8();
	this.instance_2.setTransform(196.85,258.1,1,1,150.0008,0,0,3.8,56.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_1
	this.instance_3 = new lib.hair_girl();
	this.instance_3.setTransform(99.15,137.55,1,1,3.7454,0,0,82.9,110.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFF66").ss(1,1,1).p("ApWixQB9AKgXF0AJXjMQh0BdAkEm");
	this.shape.setTransform(120.275,193.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#0033FF").ss(1,1,1).p("AmdqSQAsKfh+KCAHLqmQgsLsBRJh");
	this.shape_1.setTransform(119.35,280.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFCC").ss(1,1,1).p("AtQAsIFsAAQADgiAIgeAIegrQARAjAMAyIEWAA");
	this.shape_2.setTransform(118.025,216.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FF3300").ss(1,1,1).p("AkpraQEJg3FFAkAFyrqIBFAAIBFAAQhFKgCXJvQg5Ajg5AbQntE/nylXQglgSglgUQCaqUhIplIBKgCIBKgD");
	this.shape_3.setTransform(121.35,286.8991);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC00").ss(1,1,1).p("AF3gJQAAARgPANQgHAGAMAJQgdgCgKAAQgIAAgdgBQAMgEgJgIQgOgNAAgRQAAgRAOgNQAFgFAGgDQAKgFANAAQADAAAEABIAQAEQAGADAFAFQAIAHAFAJQACAHAAAHgAkgAKQAAASgMAMQgJAKAIACIgVAAQgEABgFAAQgDAAgDAAQgBAAgaAAQAMgDgKgKQgMgMAAgSQAAgJADgGQADgIAGgHQANgMASAAQAQAAAMAKQABABACABQAMANAAARg");
	this.shape_4.setTransform(121.8,208.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFF99").ss(1,1,1).p("AHxjeQA4AgA2AoQFVhThxIsApOh6QAUgLATgKIBUgpQAIgEAHgDApNh6IgBAAQkEhTgMISApWh2QAEgCAEgCAlpjmQGriqFTCJQADACADAB");
	this.shape_5.setTransform(119.4313,188.4132);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC00").s().p("AlRA1IgbAAQAMgDgJgKQgNgMAAgSQAAgJADgGQADgIAHgHQAMgMASAAQARAAALAKIADACQANANAAARQAAASgNAMQgJAKAIACIgVAAIgJABIgGAAgAFGAiIglgBQAMgEgJgIQgOgNAAgRQAAgRAOgNQAFgFAHgDQAJgFANAAIAHABIARAEQAFADAGAFQAHAHAEAJQADAHAAAHQAAARgOANQgHAGALAJIgngCg");
	this.shape_6.setTransform(121.8,208.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0033FF").s().p("AhGAgQgHgDgBgHQAAgEACgEQACgFAEgCIgDgDQgFgDAAgCQgDgDAAgDQgBgEACgGQADgGAGgEQAGgDAJABQAHAAAIAEQAJAEAGAGIAEAEIABgDQAEgFAFgCQAFgCAFAAIABgBQAGAAAGAEIABAAQAGAEAEAGIACgBIAAAAQACgEAEgEQAGgIAHgDQAFgDAKAAQAIAAAEABQAIABADAFQADAGgFAIIgLAJQAKADADAGQACAGgDAEIgEAEQgDADgFADIgMABQgKgBgIgEQgKgEgFgHIgEAFQgGAIgKABQgFACgHgDIgFgCQgEgCgDgEIgCACQgEAGgJAFQgIAEgNABQgIAAgFgCg");
	this.shape_7.setTransform(125.8038,165.7438);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF3300").s().p("AoDM9QBencgBnsQAAisgLitQALCtAACsQABHsheHcQglgSglgUQCbqVhJpkIBKgCIBKgDIAbAAIAFAAIAKgBIAVAAQEIg3FFAkIAmABIAnACIBFAAIBFAAQhFKfCXJwQg5Ajg5AbQg1mKABnGQAAj2APkHQgPEHAAD2QgBHGA1GKQjuCajuAAQkBAAkCiygAHcNVIAAAAgAl5oiIhWmIQAEgBgEgHQgDgGAXgRQAXgRAnANIBYGXIgFADQgMgKgRAAQgSAAgMAMQgHAHgDAIIgKAAgAFtpEQgGgFgFgDIgRgEIgGgBQgNAAgKAFIBVmZIABAAIgBgBIgBgBIAAAAIAAgBIgBAAIABgDIACgCIADgBIAAAAIAFABQAlgFASAQQAQAQgBAFQABAFgCAGIAAAAIAAABIheGNQgEgJgIgHg");
	this.shape_8.setTransform(121.35,262.6573);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFAA5").s().p("AteFFQAMoSEEBTIgIAEIAIgEIABAAIAmgVIBUgpIAPgHIAJgEIBVGHIALAAQgDAHAAAIQAAASAMANQAKAKgMACIhKADIhJADQADg6AAgyQAAkKhpgIQBpAIAAEKQAAAygDA6QgIAfgDAigAItFDQgMgzgRgjQgJhGAAg7QAAi7BYhHQhYBHAAC7QAAA7AJBGIhGAAIhFAAQgMgIAHgHQAPgMAAgSQAAgIgDgGIBemNIABAAIAAgBIACAAIADgBIABgBQA4AgA2AoQFVhThxIsgAkUDyQAMgNAAgSQAAgSgMgMIgDgDIAFgCIhXmWQGriqFTCJIACAFIAAABQACACADABIhVGYQgGADgFAEQgOANAAASQAAASAOAMQAJAIgMAEQlFgkkJA4QgIgDAJgJgAgHj+QgGAEgDAGQgCAGABAEQAAADADADQAAADAFADIADADQgEACgCAFQgCAEAAAEQABAHAHADQAFACAHAAQANgBAIgEQAJgFAEgGIACgCQADAEAEACIAFACQAHADAGgCQAKgBAGgIIAEgFQAFAHAKAEQAIAEAKABIAMgBQAFgDADgDIAEgEQADgEgCgGQgDgGgKgEIALgJQAFgIgDgGQgDgFgIgBQgEgBgIAAQgKAAgFADQgHADgGAIQgEAEgCAEIAAAAIgCABQgEgGgGgEIgBAAQgGgEgHAAIgBABQgFAAgFACQgFACgEAFIgBADIgEgEQgGgGgJgEQgIgEgHAAIgEAAQgGAAgEACg");
	this.shape_9.setTransform(119.4313,188.4132);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_3}]}).wait(1));

	// Layer_4
	this.instance_4 = new lib.arm8();
	this.instance_4.setTransform(53.15,255.45,1,1,160.6983,0,0,3.2,57.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_3
	this.instance_5 = new lib.arm7();
	this.instance_5.setTransform(55.35,212.7,1,1,-11.52,0,0,13.6,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_2
	this.instance_6 = new lib.arm7();
	this.instance_6.setTransform(185.1,214.95,1,1,-26.1662,0,0,11,1.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_11
	this.instance_7 = new lib.legshoegirlL();
	this.instance_7.setTransform(91.05,391,1,1,0,-7.784,172.216,14.5,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_10
	this.instance_8 = new lib.legshoegirlR();
	this.instance_8.setTransform(152.6,388.45,1,1,2.2256,0,0,12.6,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_8
	this.instance_9 = new lib.thigh();
	this.instance_9.setTransform(85.65,343.1,1,1,-14.9992,0,0,13.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_9
	this.instance_10 = new lib.thigh();
	this.instance_10.setTransform(155.7,343.3,1,1,-8.0099,0,0,17.5,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PINOCCHIOgirl, new cjs.Rectangle(0.1,0,236.4,482.1), null);


(lib.PINOCCHIOgirlsed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.close_blink();
	this.instance.setTransform(55.15,95.4,0.9049,0.9049,0,-6.2126,173.7874,20.2,15);

	this.instance_1 = new lib.close_blink();
	this.instance_1.setTransform(95.65,91,0.9483,0.9483,7.7309,0,0,20.4,7.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC99").s().p("Ah/A/QgSgJgGgSQgGgUALgQQAMgSAXgCIAPgCQAGgCAHgFQBAgqBeACQAcABAQAGQAYAJAIATQAGANgEAPQgDAOgKAMQgQATgiALQghAKgzAAQglABgLABIgGABIAGgIIAIgMQAEgIgBgFQgBgFgEgEIgIgIQgLgKACgIQABgIAKgDQAJgEAKACQAMADAIAMQAGAHAEAOQgBgSgGgOQgGgRgQgHQgOgFgPAEQgTAFgIAPQgHAMADAQQAEAOAKALQgJAMgDAIQgDAIABAHIgDAAIgLABQgTAAgMgHg");
	this.shape.setTransform(78.8438,122.6508);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0033").s().p("AgdBBQgJgGgEgJQgCgEAAgFQAAgHADgIQADgIAJgMQgLgKgDgOQgEgRAHgMQAIgPAUgFQAOgEANAFQAQAHAIARQAGAOABATQgFgOgGgIQgIgMgNgDQgJgCgIAEQgKADgCAIQgCAJAMAKIAHAIQAEAEAAAEQABAFgEAIIgHAMIgFAIIgBADQgBABAAABQAAAAAAABQgBAAAAABQAAAAABABIAEACQAHADANgCIAVgEQgLAMgJAGQgMAJgMABIgDAAQgJAAgHgFg");
	this.shape_1.setTransform(74.9917,125.4688);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_1
	this.instance_2 = new lib.PINOCCHIOgirl();
	this.instance_2.setTransform(118.2,241,1,1,0,0,0,118.2,241);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PINOCCHIOgirlsed, new cjs.Rectangle(0.1,0,236.4,482.1), null);


(lib.Scene_1_Girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Girl
	this.instance = new lib.PINOCCHIOgirl();
	this.instance.setTransform(985.85,474.35,1,1,0,0,0,118.2,241);

	this.replay = new lib.PINOCCHIOgirlsed();
	this.replay.name = "replay";
	this.replay.setTransform(986.5,475.2,1,1,0,0,0,118.2,241);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},417).to({state:[{t:this.replay}]},144).wait(60));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.pincchio = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,561,619,620];
	this.streamSoundSymbolsList[0] = [{id:"SOUNDpinocchio_1",startFrame:0,endFrame:621,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("SOUNDpinocchio_1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,621,1);
		this.start = this.bottonStart.start;
		var self = this; 
		self.stop(); 
		
		self.start.addEventListener("click", startPlaying);
		function startPlaying()
		{
			self.gotoAndPlay(0);
		}
	}
	this.frame_1 = function() {
		this.start = undefined;
	}
	this.frame_561 = function() {
		this.replay = this.Girl.replay;
	}
	this.frame_619 = function() {
		this.replay = this.bottonStart.replay;
		var self = this; 
		self.stop(); 
		self.replay.addEventListener("click", playAgain);
		function playAgain()
		{
			self.gotoAndPlay(1); 
			}
	}
	this.frame_620 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(560).call(this.frame_561).wait(58).call(this.frame_619).wait(1).call(this.frame_620).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(50).to({scaleX:0.9865,scaleY:0.9865,x:640.4575,y:360.8288},0).wait(1).to({scaleX:0.973,scaleY:0.973,x:640.915,y:361.6575},0).wait(1).to({scaleX:0.9595,scaleY:0.9595,x:641.3725,y:362.4863},0).wait(1).to({scaleX:0.946,scaleY:0.946,x:641.83,y:363.315},0).wait(1).to({scaleX:0.9325,scaleY:0.9325,x:642.2875,y:364.1438},0).wait(1).to({scaleX:0.919,scaleY:0.919,x:642.745,y:364.9725},0).wait(1).to({scaleX:0.9055,scaleY:0.9055,x:643.2025,y:365.8013},0).wait(1).to({scaleX:0.8921,scaleY:0.8921,x:643.66,y:366.63},0).wait(1).to({scaleX:0.8786,scaleY:0.8786,x:644.1175,y:367.4588},0).wait(1).to({scaleX:0.8651,scaleY:0.8651,x:644.575,y:368.2875},0).wait(1).to({scaleX:0.8516,scaleY:0.8516,x:645.0325,y:369.1163},0).wait(1).to({scaleX:0.8381,scaleY:0.8381,x:645.49,y:369.945},0).wait(1).to({scaleX:0.8246,scaleY:0.8246,x:645.9475,y:370.7738},0).wait(1).to({scaleX:0.8111,scaleY:0.8111,x:646.405,y:371.6025},0).wait(1).to({scaleX:0.7976,scaleY:0.7976,x:646.8625,y:372.4313},0).wait(1).to({scaleX:0.7841,scaleY:0.7841,x:647.32,y:373.26},0).wait(1).to({scaleX:0.7706,scaleY:0.7706,x:647.7775,y:374.0888},0).wait(1).to({scaleX:0.7571,scaleY:0.7571,x:648.235,y:374.9175},0).wait(1).to({scaleX:0.7436,scaleY:0.7436,x:648.6925,y:375.7462},0).wait(1).to({scaleX:0.7301,scaleY:0.7301,x:649.15,y:376.575},0).wait(1).to({scaleX:0.7166,scaleY:0.7166,x:649.6075,y:377.4038},0).wait(1).to({scaleX:0.7031,scaleY:0.7031,x:650.065,y:378.2325},0).wait(1).to({scaleX:0.6897,scaleY:0.6897,x:650.5225,y:379.0612},0).wait(1).to({scaleX:0.6762,scaleY:0.6762,x:650.98,y:379.89},0).wait(1).to({scaleX:0.6627,scaleY:0.6627,x:651.4375,y:380.7188},0).wait(1).to({scaleX:0.6492,scaleY:0.6492,x:651.895,y:381.5475},0).wait(1).to({scaleX:0.6357,scaleY:0.6357,x:652.3525,y:382.3763},0).wait(1).to({scaleX:0.6222,scaleY:0.6222,x:652.81,y:383.205},0).wait(1).to({scaleX:0.6087,scaleY:0.6087,x:653.2675,y:384.0338},0).wait(1).to({scaleX:0.5952,scaleY:0.5952,x:653.725,y:384.8625},0).wait(1).to({scaleX:0.5817,scaleY:0.5817,x:654.1825,y:385.6913},0).wait(1).to({scaleX:0.5682,scaleY:0.5682,x:654.64,y:386.52},0).wait(1).to({scaleX:0.5547,scaleY:0.5547,x:655.0975,y:387.3488},0).wait(1).to({scaleX:0.5412,scaleY:0.5412,x:655.555,y:388.1775},0).wait(1).to({scaleX:0.5277,scaleY:0.5277,x:656.0125,y:389.0063},0).wait(1).to({scaleX:0.5142,scaleY:0.5142,x:656.47,y:389.835},0).wait(1).to({scaleX:0.5007,scaleY:0.5007,x:656.9275,y:390.6638},0).wait(1).to({scaleX:0.4873,scaleY:0.4873,x:657.385,y:391.4925},0).wait(1).to({scaleX:0.4738,scaleY:0.4738,x:657.8425,y:392.3213},0).wait(1).to({scaleX:0.4603,scaleY:0.4603,x:658.3,y:393.15},0).wait(1).to({scaleX:0.4605,scaleY:0.4605,x:658.3118,y:393.2105},0).wait(1).to({scaleX:0.4606,scaleY:0.4606,x:658.3237,y:393.2711},0).wait(1).to({scaleX:0.4608,scaleY:0.4608,x:658.3355,y:393.3316},0).wait(1).to({scaleX:0.461,scaleY:0.461,x:658.3474,y:393.3921},0).wait(1).to({scaleX:0.4612,scaleY:0.4612,x:658.3592,y:393.4526},0).wait(1).to({scaleX:0.4614,scaleY:0.4614,x:658.3711,y:393.5132},0).wait(1).to({scaleX:0.4616,scaleY:0.4616,x:658.3829,y:393.5737},0).wait(1).to({scaleX:0.4618,scaleY:0.4618,x:658.3947,y:393.6342},0).wait(1).to({scaleX:0.462,scaleY:0.462,x:658.4066,y:393.6947},0).wait(1).to({scaleX:0.4622,scaleY:0.4622,x:658.4184,y:393.7553},0).wait(1).to({scaleX:0.4624,scaleY:0.4624,x:658.4303,y:393.8158},0).wait(1).to({scaleX:0.4625,scaleY:0.4625,x:658.4421,y:393.8763},0).wait(1).to({scaleX:0.4627,scaleY:0.4627,x:658.454,y:393.9368},0).wait(1).to({scaleX:0.4629,scaleY:0.4629,x:658.4658,y:393.9974},0).wait(1).to({scaleX:0.4631,scaleY:0.4631,x:658.4776,y:394.0579},0).wait(1).to({scaleX:0.4633,scaleY:0.4633,x:658.4895,y:394.1184},0).wait(1).to({scaleX:0.4635,scaleY:0.4635,x:658.5013,y:394.179},0).wait(1).to({scaleX:0.4637,scaleY:0.4637,x:658.5132,y:394.2395},0).wait(1).to({scaleX:0.4639,scaleY:0.4639,x:658.525,y:394.3},0).wait(1).to({scaleX:0.4641,scaleY:0.4641,x:658.5368,y:394.3605},0).wait(1).to({scaleX:0.4643,scaleY:0.4643,x:658.5487,y:394.4211},0).wait(1).to({scaleX:0.4644,scaleY:0.4644,x:658.5605,y:394.4816},0).wait(1).to({scaleX:0.4646,scaleY:0.4646,x:658.5724,y:394.5421},0).wait(1).to({scaleX:0.4648,scaleY:0.4648,x:658.5842,y:394.6026},0).wait(1).to({scaleX:0.465,scaleY:0.465,x:658.5961,y:394.6632},0).wait(1).to({scaleX:0.4652,scaleY:0.4652,x:658.6079,y:394.7237},0).wait(1).to({scaleX:0.4654,scaleY:0.4654,x:658.6197,y:394.7842},0).wait(1).to({scaleX:0.4656,scaleY:0.4656,x:658.6316,y:394.8447},0).wait(1).to({scaleX:0.4658,scaleY:0.4658,x:658.6434,y:394.9053},0).wait(1).to({scaleX:0.466,scaleY:0.466,x:658.6553,y:394.9658},0).wait(1).to({scaleX:0.4662,scaleY:0.4662,x:658.6671,y:395.0263},0).wait(1).to({scaleX:0.4663,scaleY:0.4663,x:658.679,y:395.0868},0).wait(1).to({scaleX:0.4665,scaleY:0.4665,x:658.6908,y:395.1474},0).wait(1).to({scaleX:0.4667,scaleY:0.4667,x:658.7026,y:395.2079},0).wait(1).to({scaleX:0.4669,scaleY:0.4669,x:658.7145,y:395.2684},0).wait(1).to({scaleX:0.4671,scaleY:0.4671,x:658.7263,y:395.329},0).wait(1).to({scaleX:0.4673,scaleY:0.4673,x:658.7382,y:395.3895},0).wait(1).to({scaleX:0.4675,scaleY:0.4675,x:658.75,y:395.45},0).wait(36).to({scaleX:0.5088,scaleY:0.5088,x:657.1286,y:393.8179},0).wait(1).to({scaleX:0.5501,scaleY:0.5501,x:655.5071,y:392.1857},0).wait(1).to({scaleX:0.5913,scaleY:0.5913,x:653.8857,y:390.5536},0).wait(1).to({scaleX:0.6326,scaleY:0.6326,x:652.2643,y:388.9214},0).wait(1).to({scaleX:0.6739,scaleY:0.6739,x:650.6429,y:387.2893},0).wait(1).to({scaleX:0.7152,scaleY:0.7152,x:649.0214,y:385.6571},0).wait(1).to({scaleX:0.7565,scaleY:0.7565,x:647.4,y:384.025},0).wait(1).to({scaleX:0.7978,scaleY:0.7978,x:645.7786,y:382.3929},0).wait(1).to({scaleX:0.839,scaleY:0.839,x:644.1571,y:380.7607},0).wait(1).to({scaleX:0.8803,scaleY:0.8803,x:642.5357,y:379.1286},0).wait(1).to({scaleX:0.9216,scaleY:0.9216,x:640.9143,y:377.4964},0).wait(1).to({scaleX:0.9629,scaleY:0.9629,x:639.2929,y:375.8643},0).wait(1).to({scaleX:1.0042,scaleY:1.0042,x:637.6714,y:374.2321},0).wait(1).to({scaleX:1.0455,scaleY:1.0455,x:636.05,y:372.6},0).wait(242).to({scaleX:1.0377,scaleY:1.0377,x:638.0009,y:372.5455},0).wait(1).to({scaleX:1.0299,scaleY:1.0299,x:639.9518,y:372.4911},0).wait(1).to({scaleX:1.0222,scaleY:1.0222,x:641.9027,y:372.4366},0).wait(1).to({scaleX:1.0144,scaleY:1.0144,x:643.8536,y:372.3821},0).wait(1).to({scaleX:1.0066,scaleY:1.0066,x:645.8045,y:372.3277},0).wait(1).to({scaleX:0.9989,scaleY:0.9989,x:647.7554,y:372.2732},0).wait(1).to({scaleX:0.9911,scaleY:0.9911,x:649.7063,y:372.2188},0).wait(1).to({scaleX:0.9834,scaleY:0.9834,x:651.6571,y:372.1643},0).wait(1).to({scaleX:0.9756,scaleY:0.9756,x:653.608,y:372.1098},0).wait(1).to({scaleX:0.9678,scaleY:0.9678,x:655.5589,y:372.0554},0).wait(1).to({scaleX:0.9601,scaleY:0.9601,x:657.5098,y:372.0009},0).wait(1).to({scaleX:0.9523,scaleY:0.9523,x:659.4607,y:371.9464},0).wait(1).to({scaleX:0.9445,scaleY:0.9445,x:661.4116,y:371.892},0).wait(1).to({scaleX:0.9368,scaleY:0.9368,x:663.3625,y:371.8375},0).wait(1).to({scaleX:0.929,scaleY:0.929,x:665.3134,y:371.783},0).wait(1).to({scaleX:0.9213,scaleY:0.9213,x:667.2643,y:371.7286},0).wait(1).to({scaleX:0.9135,scaleY:0.9135,x:669.2152,y:371.6741},0).wait(1).to({scaleX:0.9057,scaleY:0.9057,x:671.1661,y:371.6196},0).wait(1).to({scaleX:0.898,scaleY:0.898,x:673.117,y:371.5652},0).wait(1).to({scaleX:0.8902,scaleY:0.8902,x:675.0679,y:371.5107},0).wait(1).to({scaleX:0.8824,scaleY:0.8824,x:677.0188,y:371.4563},0).wait(1).to({scaleX:0.8747,scaleY:0.8747,x:678.9696,y:371.4018},0).wait(1).to({scaleX:0.8669,scaleY:0.8669,x:680.9205,y:371.3473},0).wait(1).to({scaleX:0.8592,scaleY:0.8592,x:682.8714,y:371.2929},0).wait(1).to({scaleX:0.8514,scaleY:0.8514,x:684.8223,y:371.2384},0).wait(1).to({scaleX:0.8436,scaleY:0.8436,x:686.7732,y:371.1839},0).wait(1).to({scaleX:0.8359,scaleY:0.8359,x:688.7241,y:371.1295},0).wait(1).to({scaleX:0.8281,scaleY:0.8281,x:690.675,y:371.075},0).wait(1).to({scaleX:0.8203,scaleY:0.8203,x:692.6259,y:371.0205},0).wait(1).to({scaleX:0.8126,scaleY:0.8126,x:694.5768,y:370.9661},0).wait(1).to({scaleX:0.8048,scaleY:0.8048,x:696.5277,y:370.9116},0).wait(1).to({scaleX:0.7971,scaleY:0.7971,x:698.4786,y:370.8571},0).wait(1).to({scaleX:0.7893,scaleY:0.7893,x:700.4295,y:370.8027},0).wait(1).to({scaleX:0.7815,scaleY:0.7815,x:702.3804,y:370.7482},0).wait(1).to({scaleX:0.7738,scaleY:0.7738,x:704.3313,y:370.6938},0).wait(1).to({scaleX:0.766,scaleY:0.766,x:706.2821,y:370.6393},0).wait(1).to({scaleX:0.7582,scaleY:0.7582,x:708.233,y:370.5848},0).wait(1).to({scaleX:0.7505,scaleY:0.7505,x:710.1839,y:370.5304},0).wait(1).to({scaleX:0.7427,scaleY:0.7427,x:712.1348,y:370.4759},0).wait(1).to({scaleX:0.735,scaleY:0.735,x:714.0857,y:370.4214},0).wait(1).to({scaleX:0.7272,scaleY:0.7272,x:716.0366,y:370.367},0).wait(1).to({scaleX:0.7194,scaleY:0.7194,x:717.9875,y:370.3125},0).wait(1).to({scaleX:0.7117,scaleY:0.7117,x:719.9384,y:370.258},0).wait(1).to({scaleX:0.7039,scaleY:0.7039,x:721.8893,y:370.2036},0).wait(1).to({scaleX:0.6961,scaleY:0.6961,x:723.8402,y:370.1491},0).wait(1).to({scaleX:0.6884,scaleY:0.6884,x:725.7911,y:370.0946},0).wait(1).to({scaleX:0.6806,scaleY:0.6806,x:727.742,y:370.0402},0).wait(1).to({scaleX:0.6728,scaleY:0.6728,x:729.6929,y:369.9857},0).wait(1).to({scaleX:0.6651,scaleY:0.6651,x:731.6438,y:369.9313},0).wait(1).to({scaleX:0.6573,scaleY:0.6573,x:733.5946,y:369.8768},0).wait(1).to({scaleX:0.6496,scaleY:0.6496,x:735.5455,y:369.8223},0).wait(1).to({scaleX:0.6418,scaleY:0.6418,x:737.4964,y:369.7679},0).wait(1).to({scaleX:0.634,scaleY:0.634,x:739.4473,y:369.7134},0).wait(1).to({scaleX:0.6263,scaleY:0.6263,x:741.3982,y:369.6589},0).wait(1).to({scaleX:0.6185,scaleY:0.6185,x:743.3491,y:369.6045},0).wait(1).to({scaleX:0.6107,scaleY:0.6107,x:745.3,y:369.55},0).wait(1).to({scaleX:0.6027,scaleY:0.6027,x:748.4132,y:369.1044},0).wait(1).to({scaleX:0.5947,scaleY:0.5947,x:751.5265,y:368.6588},0).wait(1).to({scaleX:0.5867,scaleY:0.5867,x:754.6397,y:368.2132},0).wait(1).to({scaleX:0.5787,scaleY:0.5787,x:757.7529,y:367.7677},0).wait(1).to({scaleX:0.5707,scaleY:0.5707,x:760.8662,y:367.3221},0).wait(1).to({scaleX:0.5627,scaleY:0.5627,x:763.9794,y:366.8765},0).wait(1).to({scaleX:0.5547,scaleY:0.5547,x:767.0927,y:366.4309},0).wait(1).to({scaleX:0.5467,scaleY:0.5467,x:770.2059,y:365.9853},0).wait(1).to({scaleX:0.5386,scaleY:0.5386,x:773.3191,y:365.5397},0).wait(1).to({scaleX:0.5306,scaleY:0.5306,x:776.4324,y:365.0941},0).wait(1).to({scaleX:0.5226,scaleY:0.5226,x:779.5456,y:364.6485},0).wait(1).to({scaleX:0.5146,scaleY:0.5146,x:782.6588,y:364.2029},0).wait(1).to({scaleX:0.5066,scaleY:0.5066,x:785.7721,y:363.7573},0).wait(1).to({scaleX:0.4986,scaleY:0.4986,x:788.8853,y:363.3118},0).wait(1).to({scaleX:0.4906,scaleY:0.4906,x:791.9985,y:362.8662},0).wait(1).to({scaleX:0.4826,scaleY:0.4826,x:795.1118,y:362.4206},0).wait(1).to({scaleX:0.4745,scaleY:0.4745,x:798.225,y:361.975},0).wait(1).to({scaleX:0.4665,scaleY:0.4665,x:801.3382,y:361.5294},0).wait(1).to({scaleX:0.4585,scaleY:0.4585,x:804.4515,y:361.0838},0).wait(1).to({scaleX:0.4505,scaleY:0.4505,x:807.5647,y:360.6382},0).wait(1).to({scaleX:0.4425,scaleY:0.4425,x:810.6779,y:360.1927},0).wait(1).to({scaleX:0.4345,scaleY:0.4345,x:813.7912,y:359.7471},0).wait(1).to({scaleX:0.4265,scaleY:0.4265,x:816.9044,y:359.3015},0).wait(1).to({scaleX:0.4185,scaleY:0.4185,x:820.0177,y:358.8559},0).wait(1).to({scaleX:0.4105,scaleY:0.4105,x:823.1309,y:358.4103},0).wait(1).to({scaleX:0.4024,scaleY:0.4024,x:826.2441,y:357.9647},0).wait(1).to({scaleX:0.3944,scaleY:0.3944,x:829.3574,y:357.5191},0).wait(1).to({scaleX:0.3864,scaleY:0.3864,x:832.4706,y:357.0735},0).wait(1).to({scaleX:0.3784,scaleY:0.3784,x:835.5838,y:356.6279},0).wait(1).to({scaleX:0.3704,scaleY:0.3704,x:838.6971,y:356.1824},0).wait(1).to({scaleX:0.3624,scaleY:0.3624,x:841.8103,y:355.7368},0).wait(1).to({scaleX:0.3544,scaleY:0.3544,x:844.9235,y:355.2912},0).wait(1).to({scaleX:0.3464,scaleY:0.3464,x:848.0368,y:354.8456},0).wait(1).to({scaleX:0.3383,scaleY:0.3383,x:851.15,y:354.4},0).wait(1).to({scaleX:0.3377,scaleY:0.3377,x:851.5671,y:354.6817},0).wait(1).to({scaleX:0.337,scaleY:0.337,x:851.9842,y:354.9634},0).wait(1).to({scaleX:0.3363,scaleY:0.3363,x:852.4012,y:355.2451},0).wait(1).to({scaleX:0.3356,scaleY:0.3356,x:852.8183,y:355.5268},0).wait(1).to({scaleX:0.3349,scaleY:0.3349,x:853.2354,y:355.8085},0).wait(1).to({scaleX:0.3342,scaleY:0.3342,x:853.6524,y:356.0902},0).wait(1).to({scaleX:0.3335,scaleY:0.3335,x:854.0695,y:356.372},0).wait(1).to({scaleX:0.3328,scaleY:0.3328,x:854.4866,y:356.6537},0).wait(1).to({scaleX:0.3321,scaleY:0.3321,x:854.9037,y:356.9354},0).wait(1).to({scaleX:0.3314,scaleY:0.3314,x:855.3207,y:357.2171},0).wait(1).to({scaleX:0.3307,scaleY:0.3307,x:855.7378,y:357.4988},0).wait(1).to({scaleX:0.3301,scaleY:0.3301,x:856.1549,y:357.7805},0).wait(1).to({scaleX:0.3294,scaleY:0.3294,x:856.572,y:358.0622},0).wait(1).to({scaleX:0.3287,scaleY:0.3287,x:856.989,y:358.3439},0).wait(1).to({scaleX:0.328,scaleY:0.328,x:857.4061,y:358.6256},0).wait(1).to({scaleX:0.3273,scaleY:0.3273,x:857.8232,y:358.9073},0).wait(1).to({scaleX:0.3266,scaleY:0.3266,x:858.2402,y:359.189},0).wait(1).to({scaleX:0.3259,scaleY:0.3259,x:858.6573,y:359.4707},0).wait(1).to({scaleX:0.3252,scaleY:0.3252,x:859.0744,y:359.7524},0).wait(1).to({scaleX:0.3245,scaleY:0.3245,x:859.4915,y:360.0342},0).wait(1).to({scaleX:0.3238,scaleY:0.3238,x:859.9085,y:360.3159},0).wait(1).to({scaleX:0.3231,scaleY:0.3231,x:860.3256,y:360.5976},0).wait(1).to({scaleX:0.3224,scaleY:0.3224,x:860.7427,y:360.8793},0).wait(1).to({scaleX:0.3218,scaleY:0.3218,x:861.1598,y:361.161},0).wait(1).to({scaleX:0.3211,scaleY:0.3211,x:861.5768,y:361.4427},0).wait(1).to({scaleX:0.3204,scaleY:0.3204,x:861.9939,y:361.7244},0).wait(1).to({scaleX:0.3197,scaleY:0.3197,x:862.411,y:362.0061},0).wait(1).to({scaleX:0.319,scaleY:0.319,x:862.8281,y:362.2878},0).wait(1).to({scaleX:0.3183,scaleY:0.3183,x:863.2451,y:362.5695},0).wait(1).to({scaleX:0.3176,scaleY:0.3176,x:863.6622,y:362.8512},0).wait(1).to({scaleX:0.3169,scaleY:0.3169,x:864.0793,y:363.1329},0).wait(1).to({scaleX:0.3162,scaleY:0.3162,x:864.4963,y:363.4146},0).wait(1).to({scaleX:0.3155,scaleY:0.3155,x:864.9134,y:363.6963},0).wait(1).to({scaleX:0.3148,scaleY:0.3148,x:865.3305,y:363.9781},0).wait(1).to({scaleX:0.3141,scaleY:0.3141,x:865.7476,y:364.2598},0).wait(1).to({scaleX:0.3135,scaleY:0.3135,x:866.1646,y:364.5415},0).wait(1).to({scaleX:0.3128,scaleY:0.3128,x:866.5817,y:364.8232},0).wait(1).to({scaleX:0.3121,scaleY:0.3121,x:866.9988,y:365.1049},0).wait(1).to({scaleX:0.3114,scaleY:0.3114,x:867.4159,y:365.3866},0).wait(1).to({scaleX:0.3107,scaleY:0.3107,x:867.8329,y:365.6683},0).wait(1).to({scaleX:0.31,scaleY:0.31,x:868.25,y:365.95},0).wait(1).to({scaleX:0.3082,scaleY:0.3082,x:868.5479,y:365.3986},0).wait(1).to({scaleX:0.3064,scaleY:0.3064,x:868.8458,y:364.8472},0).wait(1).to({scaleX:0.3046,scaleY:0.3046,x:869.1438,y:364.2958},0).wait(1).to({scaleX:0.3028,scaleY:0.3028,x:869.4417,y:363.7444},0).wait(1).to({scaleX:0.301,scaleY:0.301,x:869.7396,y:363.1931},0).wait(1).to({scaleX:0.2992,scaleY:0.2992,x:870.0375,y:362.6417},0).wait(1).to({scaleX:0.2974,scaleY:0.2974,x:870.3354,y:362.0903},0).wait(1).to({scaleX:0.2957,scaleY:0.2957,x:870.6333,y:361.5389},0).wait(1).to({scaleX:0.2939,scaleY:0.2939,x:870.9313,y:360.9875},0).wait(1).to({scaleX:0.2921,scaleY:0.2921,x:871.2292,y:360.4361},0).wait(1).to({scaleX:0.2903,scaleY:0.2903,x:871.5271,y:359.8847},0).wait(1).to({scaleX:0.2885,scaleY:0.2885,x:871.825,y:359.3333},0).wait(1).to({scaleX:0.2867,scaleY:0.2867,x:872.1229,y:358.7819},0).wait(1).to({scaleX:0.2849,scaleY:0.2849,x:872.4208,y:358.2306},0).wait(1).to({scaleX:0.2831,scaleY:0.2831,x:872.7188,y:357.6792},0).wait(1).to({scaleX:0.2813,scaleY:0.2813,x:873.0167,y:357.1278},0).wait(1).to({scaleX:0.2795,scaleY:0.2795,x:873.3146,y:356.5764},0).wait(1).to({scaleX:0.2777,scaleY:0.2777,x:873.6125,y:356.025},0).wait(1).to({scaleX:0.2759,scaleY:0.2759,x:873.9104,y:355.4736},0).wait(1).to({scaleX:0.2741,scaleY:0.2741,x:874.2083,y:354.9222},0).wait(1).to({scaleX:0.2724,scaleY:0.2724,x:874.5063,y:354.3708},0).wait(1).to({scaleX:0.2706,scaleY:0.2706,x:874.8042,y:353.8194},0).wait(1).to({scaleX:0.2688,scaleY:0.2688,x:875.1021,y:353.2681},0).wait(1).to({scaleX:0.267,scaleY:0.267,x:875.4,y:352.7167},0).wait(1).to({scaleX:0.2652,scaleY:0.2652,x:875.6979,y:352.1653},0).wait(1).to({scaleX:0.2634,scaleY:0.2634,x:875.9958,y:351.6139},0).wait(1).to({scaleX:0.2616,scaleY:0.2616,x:876.2938,y:351.0625},0).wait(1).to({scaleX:0.2598,scaleY:0.2598,x:876.5917,y:350.5111},0).wait(1).to({scaleX:0.258,scaleY:0.258,x:876.8896,y:349.9597},0).wait(1).to({scaleX:0.2562,scaleY:0.2562,x:877.1875,y:349.4083},0).wait(1).to({scaleX:0.2544,scaleY:0.2544,x:877.4854,y:348.8569},0).wait(1).to({scaleX:0.2526,scaleY:0.2526,x:877.7833,y:348.3056},0).wait(1).to({scaleX:0.2508,scaleY:0.2508,x:878.0813,y:347.7542},0).wait(1).to({scaleX:0.249,scaleY:0.249,x:878.3792,y:347.2028},0).wait(1).to({scaleX:0.2473,scaleY:0.2473,x:878.6771,y:346.6514},0).wait(1).to({scaleX:0.2455,scaleY:0.2455,x:878.975,y:346.1},0).wait(1).to({scaleX:0.2437,scaleY:0.2437,x:879.2729,y:345.5486},0).wait(1).to({scaleX:0.2419,scaleY:0.2419,x:879.5708,y:344.9972},0).wait(1).to({scaleX:0.2401,scaleY:0.2401,x:879.8688,y:344.4458},0).wait(1).to({scaleX:0.2383,scaleY:0.2383,x:880.1667,y:343.8944},0).wait(1).to({scaleX:0.2365,scaleY:0.2365,x:880.4646,y:343.3431},0).wait(1).to({scaleX:0.2347,scaleY:0.2347,x:880.7625,y:342.7917},0).wait(1).to({scaleX:0.2329,scaleY:0.2329,x:881.0604,y:342.2403},0).wait(1).to({scaleX:0.2311,scaleY:0.2311,x:881.3583,y:341.6889},0).wait(1).to({scaleX:0.2293,scaleY:0.2293,x:881.6563,y:341.1375},0).wait(1).to({scaleX:0.2275,scaleY:0.2275,x:881.9542,y:340.5861},0).wait(1).to({scaleX:0.2257,scaleY:0.2257,x:882.2521,y:340.0347},0).wait(1).to({scaleX:0.2239,scaleY:0.2239,x:882.55,y:339.4833},0).wait(1).to({scaleX:0.2222,scaleY:0.2222,x:882.8479,y:338.9319},0).wait(1).to({scaleX:0.2204,scaleY:0.2204,x:883.1458,y:338.3806},0).wait(1).to({scaleX:0.2186,scaleY:0.2186,x:883.4438,y:337.8292},0).wait(1).to({scaleX:0.2168,scaleY:0.2168,x:883.7417,y:337.2778},0).wait(1).to({scaleX:0.215,scaleY:0.215,x:884.0396,y:336.7264},0).wait(1).to({scaleX:0.2132,scaleY:0.2132,x:884.3375,y:336.175},0).wait(1).to({scaleX:0.2114,scaleY:0.2114,x:884.6354,y:335.6236},0).wait(1).to({scaleX:0.2096,scaleY:0.2096,x:884.9333,y:335.0722},0).wait(1).to({scaleX:0.2078,scaleY:0.2078,x:885.2313,y:334.5208},0).wait(1).to({scaleX:0.206,scaleY:0.206,x:885.5292,y:333.9694},0).wait(1).to({scaleX:0.2042,scaleY:0.2042,x:885.8271,y:333.4181},0).wait(1).to({scaleX:0.2024,scaleY:0.2024,x:886.125,y:332.8667},0).wait(1).to({scaleX:0.2006,scaleY:0.2006,x:886.4229,y:332.3153},0).wait(1).to({scaleX:0.1989,scaleY:0.1989,x:886.7208,y:331.7639},0).wait(1).to({scaleX:0.1971,scaleY:0.1971,x:887.0188,y:331.2125},0).wait(1).to({scaleX:0.1953,scaleY:0.1953,x:887.3167,y:330.6611},0).wait(1).to({scaleX:0.1935,scaleY:0.1935,x:887.6146,y:330.1097},0).wait(1).to({scaleX:0.1917,scaleY:0.1917,x:887.9125,y:329.5583},0).wait(1).to({scaleX:0.1899,scaleY:0.1899,x:888.2104,y:329.0069},0).wait(1).to({scaleX:0.1881,scaleY:0.1881,x:888.5083,y:328.4556},0).wait(1).to({scaleX:0.1863,scaleY:0.1863,x:888.8063,y:327.9042},0).wait(1).to({scaleX:0.1845,scaleY:0.1845,x:889.1042,y:327.3528},0).wait(1).to({scaleX:0.1827,scaleY:0.1827,x:889.4021,y:326.8014},0).wait(1).to({scaleX:0.1809,scaleY:0.1809,x:889.7,y:326.25},0).wait(1));

	// bottonStart_obj_
	this.bottonStart = new lib.Scene_1_bottonStart();
	this.bottonStart.name = "bottonStart";
	this.bottonStart.setTransform(712.6,469.3,1,1,0,0,0,712.6,469.3);
	this.bottonStart.depth = 0;
	this.bottonStart.isAttachedToCamera = 0
	this.bottonStart.isAttachedToMask = 0
	this.bottonStart.layerDepth = 0
	this.bottonStart.layerIndex = 0
	this.bottonStart.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.bottonStart).wait(619).to({regX:902.7,regY:346.9,scaleX:5.4732,scaleY:5.4732,x:712.65,y:469.6},0).wait(2));

	// clouds_obj_
	this.clouds = new lib.Scene_1_clouds();
	this.clouds.name = "clouds";
	this.clouds.depth = 0;
	this.clouds.isAttachedToCamera = 0
	this.clouds.isAttachedToMask = 0
	this.clouds.layerDepth = 0
	this.clouds.layerIndex = 1
	this.clouds.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.clouds).wait(417).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565},0).wait(1).to({regX:208.2,regY:134.8,scaleX:1,scaleY:1,x:241.15,y:138.5},0).wait(203));

	// Drape_obj_
	this.Drape = new lib.Scene_1_Drape();
	this.Drape.name = "Drape";
	this.Drape.setTransform(642.8,349.8,1,1,0,0,0,642.8,349.8);
	this.Drape.depth = 0;
	this.Drape.isAttachedToCamera = 0
	this.Drape.isAttachedToMask = 0
	this.Drape.layerDepth = 0
	this.Drape.layerIndex = 2
	this.Drape.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Drape).wait(1).to({regY:-27.8,y:-27.8},0).wait(48).to({regY:349.8,y:349.8},0).wait(572));

	// spotlight_obj_
	this.spotlight = new lib.Scene_1_spotlight();
	this.spotlight.name = "spotlight";
	this.spotlight.setTransform(784.8,591.1,1,1,0,0,0,784.8,591.1);
	this.spotlight.depth = 0;
	this.spotlight.isAttachedToCamera = 0
	this.spotlight.isAttachedToMask = 0
	this.spotlight.layerDepth = 0
	this.spotlight.layerIndex = 3
	this.spotlight.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.spotlight).wait(1).to({regX:777.2,regY:589.6,x:777.2,y:589.6},0).wait(415).to({regX:787.5,regY:614.2,scaleX:0.9565,scaleY:0.9565,x:784.8,y:591.05},0).to({_off:true},1).wait(204));

	// eyeL_obj_
	this.eyeL = new lib.Scene_1_eyeL();
	this.eyeL.name = "eyeL";
	this.eyeL.setTransform(579,347.1,1,1,0,0,0,579,347.1);
	this.eyeL.depth = 0;
	this.eyeL.isAttachedToCamera = 0
	this.eyeL.isAttachedToMask = 0
	this.eyeL.layerDepth = 0
	this.eyeL.layerIndex = 4
	this.eyeL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eyeL).wait(74).to({regX:611,regY:372.2,scaleX:1.5091,scaleY:1.5091,x:579.05,y:347.15},0).wait(306).to({regX:572.3,regY:359.2,scaleX:0.9565,scaleY:0.9565,x:578.95,y:347.1},0).to({_off:true},1).wait(240));

	// eyeR_obj_
	this.eyeR = new lib.Scene_1_eyeR();
	this.eyeR.name = "eyeR";
	this.eyeR.setTransform(621.4,337.1,1,1,0,0,0,621.4,337.1);
	this.eyeR.depth = 0;
	this.eyeR.isAttachedToCamera = 0
	this.eyeR.isAttachedToMask = 0
	this.eyeR.layerDepth = 0
	this.eyeR.layerIndex = 5
	this.eyeR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eyeR).wait(74).to({regX:639.1,regY:365.5,scaleX:1.5091,scaleY:1.5091,x:621.45,y:337.05},0).wait(306).to({regX:616.6,regY:348.7,scaleX:0.9565,scaleY:0.9565,x:621.35,y:337.1},0).wait(5).to({_off:true},214).wait(22));

	// nose_obj_
	this.nose = new lib.Scene_1_nose();
	this.nose.name = "nose";
	this.nose.setTransform(580.1,367.3,1,1,0,0,0,580.1,367.3);
	this.nose.depth = 0;
	this.nose.isAttachedToCamera = 0
	this.nose.isAttachedToMask = 0
	this.nose.layerDepth = 0
	this.nose.layerIndex = 6
	this.nose.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.nose).wait(380).to({regX:573.5,regY:380.3,scaleX:0.9565,scaleY:0.9565},0).wait(5).to({_off:true},214).wait(22));

	// hat_obj_
	this.hat = new lib.Scene_1_hat();
	this.hat.name = "hat";
	this.hat.setTransform(921.5,301.8,1,1,0,0,0,921.5,301.8);
	this.hat.depth = 0;
	this.hat.isAttachedToCamera = 0
	this.hat.isAttachedToMask = 0
	this.hat.layerDepth = 0
	this.hat.layerIndex = 7
	this.hat.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hat).wait(90).to({regX:787.9,regY:366.4,scaleX:2.1718,scaleY:2.1718,x:921.4},0).wait(290).to({regX:930.4,regY:311.8,scaleX:0.9565,scaleY:0.9565,x:921.45},0).wait(5).to({_off:true},214).wait(22));

	// hair_obj_
	this.hair = new lib.Scene_1_hair();
	this.hair.name = "hair";
	this.hair.setTransform(611.7,296.4,1,1,0,0,0,611.7,296.4);
	this.hair.depth = 0;
	this.hair.isAttachedToCamera = 0
	this.hair.isAttachedToMask = 0
	this.hair.layerDepth = 0
	this.hair.layerIndex = 8
	this.hair.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hair).wait(380).to({regX:606.6,regY:306.2,scaleX:0.9565,scaleY:0.9565,x:611.75,y:296.45},0).wait(5).to({_off:true},214).wait(22));

	// shirt_obj_
	this.shirt = new lib.Scene_1_shirt();
	this.shirt.name = "shirt";
	this.shirt.setTransform(654.1,383.4,1,1,0,0,0,654.1,383.4);
	this.shirt.depth = 0;
	this.shirt.isAttachedToCamera = 0
	this.shirt.isAttachedToMask = 0
	this.shirt.layerDepth = 0
	this.shirt.layerIndex = 9
	this.shirt.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.shirt).wait(135).to({regX:665.4,regY:406.4,scaleX:2.1391,scaleY:2.1391,x:654.15,y:383.3},0).wait(245).to({regX:650.9,regY:397.1,scaleX:0.9565,scaleY:0.9565,y:383.4},0).wait(5).to({_off:true},214).wait(22));

	// smail_obj_
	this.smail = new lib.Scene_1_smail();
	this.smail.name = "smail";
	this.smail.setTransform(612.4,370.1,1,1,0,0,0,612.4,370.1);
	this.smail.depth = 0;
	this.smail.isAttachedToCamera = 0
	this.smail.isAttachedToMask = 0
	this.smail.layerDepth = 0
	this.smail.layerIndex = 10
	this.smail.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.smail).wait(62).to({regX:623.1,regY:379,scaleX:1.2127,scaleY:1.2127,x:612.35,y:370},0).wait(23).to({regX:642.2,regY:395,scaleX:1.9446,scaleY:1.9446,x:612.3,y:370.05},0).wait(299).to({regX:607.2,regY:383.2,scaleX:0.9565,scaleY:0.9565,x:612.35,y:370.1},0).to({_off:true},217).wait(20));

	// head_obj_
	this.head = new lib.Scene_1_head();
	this.head.name = "head";
	this.head.setTransform(623.6,308.3,1,1,0,0,0,623.6,308.3);
	this.head.depth = 0;
	this.head.isAttachedToCamera = 0
	this.head.isAttachedToMask = 0
	this.head.layerDepth = 0
	this.head.layerIndex = 11
	this.head.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.head).wait(85).to({regX:648,regY:363.2,scaleX:1.9446,scaleY:1.9446,x:623.55,y:308.25},0).wait(295).to({regX:618.9,regY:318.6,scaleX:0.9565,scaleY:0.9565,y:308.3},0).wait(37).to({_off:true},182).wait(22));

	// Girl_obj_
	this.Girl = new lib.Scene_1_Girl();
	this.Girl.name = "Girl";
	this.Girl.depth = 0;
	this.Girl.isAttachedToCamera = 0
	this.Girl.isAttachedToMask = 0
	this.Girl.layerDepth = 0
	this.Girl.layerIndex = 12
	this.Girl.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Girl).wait(417).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565},0).wait(144).to({regX:688.6,regY:255.6,scaleX:3.4882,scaleY:3.4882,x:-0.15,y:0.05},0).wait(60));

	// simboles_obj_
	this.simboles = new lib.Scene_1_simboles();
	this.simboles.name = "simboles";
	this.simboles.setTransform(681.8,508.1,1,1,0,0,0,681.8,508.1);
	this.simboles.depth = 0;
	this.simboles.isAttachedToCamera = 0
	this.simboles.isAttachedToMask = 0
	this.simboles.layerDepth = 0
	this.simboles.layerIndex = 13
	this.simboles.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.simboles).wait(380).to({regX:679.8,regY:527.5,scaleX:0.9565,scaleY:0.9565},0).wait(6).to({regX:640.3,regY:475.6,scaleX:1,scaleY:1,x:642.25,y:456.25},0).wait(30).to({regX:679.8,regY:527.5,scaleX:0.9565,scaleY:0.9565,x:681.8,y:508.1},0).wait(34).to({regX:733.4,regY:487.7,scaleX:1.267,scaleY:1.267},0).wait(1).to({regX:640.3,regY:475.6,scaleX:1,scaleY:1,x:588.75,y:496},0).wait(50).to({regX:848.6,regY:414.4,scaleX:2.5879,scaleY:2.5879,x:681.75,y:508.25},0).wait(8).to({regX:866.1,regY:404.9,scaleX:2.9677,scaleY:2.9677,x:681.95,y:508.05},0).wait(17).to({regX:872.6,regY:407.9,scaleX:3.0751,scaleY:3.0751,x:681.6,y:507.85},0).wait(1).to({regX:640.3,regY:475.6,scaleX:1,scaleY:1,x:449.45,y:575.65},0).wait(34).to({regX:884.1,regY:401.2,scaleX:3.4882,scaleY:3.4882,x:681.8,y:507.9},0).wait(60));

	// pantsL_obj_
	this.pantsL = new lib.Scene_1_pantsL();
	this.pantsL.name = "pantsL";
	this.pantsL.setTransform(568.7,564.5,1,1,0,0,0,568.7,564.5);
	this.pantsL.depth = 0;
	this.pantsL.isAttachedToCamera = 0
	this.pantsL.isAttachedToMask = 0
	this.pantsL.layerDepth = 0
	this.pantsL.layerIndex = 14
	this.pantsL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.pantsL).wait(128).to({regX:625.5,regY:491.1,scaleX:2.1391,scaleY:2.1391,x:568.8},0).wait(1).to({regX:579.6,regY:595.7,scaleX:1,scaleY:1,x:522.85,y:669.05},0).wait(34).to({regX:620.8,regY:497.8,scaleX:1.9656,scaleY:1.9656,x:568.65,y:564.45},0).wait(3).to({regX:607.1,regY:518.2,scaleX:1.5807,scaleY:1.5807,x:568.6,y:564.35},0).wait(131).to({regX:561.6,regY:586.4,scaleX:0.9565,scaleY:0.9565,x:568.7,y:564.45},0).wait(1).to({regX:579.6,regY:595.7,scaleX:1,scaleY:1,x:586.7,y:573.75},0).wait(24).to({regX:561.6,regY:586.4,scaleX:0.9565,scaleY:0.9565,x:568.7,y:564.45},0).wait(33).to({regX:579.6,regY:595.7,scaleX:1,scaleY:1,x:586.7,y:573.75},0).wait(12).to({regX:561.6,regY:586.4,scaleX:0.9565,scaleY:0.9565,x:568.7,y:564.45},0).wait(18).to({_off:true},159).wait(77));

	// pantsR_obj_
	this.pantsR = new lib.Scene_1_pantsR();
	this.pantsR.name = "pantsR";
	this.pantsR.setTransform(800.4,573.4,1,1,0,0,0,800.4,573.4);
	this.pantsR.depth = 0;
	this.pantsR.isAttachedToCamera = 0
	this.pantsR.isAttachedToMask = 0
	this.pantsR.layerDepth = 0
	this.pantsR.layerIndex = 15
	this.pantsR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.pantsR).wait(129).to({regX:733.8,regY:495.2,scaleX:2.1391,scaleY:2.1391,x:800.45,y:573.25},0).wait(1).to({regX:791.4,regY:598.1,scaleX:1,scaleY:1,x:858,y:676.2},0).wait(33).to({regX:738.6,regY:502.3,scaleX:1.9656,scaleY:1.9656,x:800.2,y:573.3},0).wait(12).to({regX:798.8,regY:588.5,scaleX:0.9958,scaleY:0.9958,x:800.4,y:573.4},0).wait(1).to({regX:791.4,regY:598.1,scaleX:1,scaleY:1,x:792.95,y:583.05},0).wait(13).to({regX:803.8,regY:595.7,scaleX:0.9565,scaleY:0.9565,x:800.4,y:573.35},0).wait(52).to({regX:791.4,regY:598.1,scaleX:1,scaleY:1,x:788,y:575.75},0).wait(18).to({regX:803.8,regY:595.7,scaleX:0.9565,scaleY:0.9565,x:800.4,y:573.35},0).wait(126).to({_off:true},159).wait(77));

	// handL_obj_
	this.handL = new lib.Scene_1_handL();
	this.handL.name = "handL";
	this.handL.setTransform(599,462.2,1,1,0,0,0,599,462.2);
	this.handL.depth = 0;
	this.handL.isAttachedToCamera = 0
	this.handL.isAttachedToMask = 0
	this.handL.layerDepth = 0
	this.handL.layerIndex = 16
	this.handL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.handL).wait(130).to({regX:639.6,regY:443.3,scaleX:2.1391,scaleY:2.1391,x:598.95,y:462.25},0).wait(46).to({regX:593.2,regY:479.6,scaleX:0.9565,scaleY:0.9565,y:462.3},0).wait(79).to({regX:605.6,regY:467.3,scaleX:1,scaleY:1,x:611.35,y:450},0).wait(9).to({regX:593.2,regY:479.6,scaleX:0.9565,scaleY:0.9565,x:598.95,y:462.3},0).wait(6).to({regX:605.6,regY:467.3,scaleX:1,scaleY:1,x:611.35,y:450},0).wait(1).to({regX:593.2,regY:479.6,scaleX:0.9565,scaleY:0.9565,x:598.95,y:462.3},0).wait(83).to({regX:605.6,regY:467.3,scaleX:1,scaleY:1,x:611.35,y:450},0).wait(17).to({regX:593.2,regY:479.6,scaleX:0.9565,scaleY:0.9565,x:598.95,y:462.3},0).wait(14).to({_off:true},183).wait(53));

	// fingerRIGHT_obj_
	this.fingerRIGHT = new lib.Scene_1_fingerRIGHT();
	this.fingerRIGHT.name = "fingerRIGHT";
	this.fingerRIGHT.setTransform(782,527.5,1,1,0,0,0,782,527.5);
	this.fingerRIGHT.depth = 0;
	this.fingerRIGHT.isAttachedToCamera = 0
	this.fingerRIGHT.isAttachedToMask = 0
	this.fingerRIGHT.layerDepth = 0
	this.fingerRIGHT.layerIndex = 17
	this.fingerRIGHT.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fingerRIGHT).wait(62).to({regX:763,regY:508.9,scaleX:1.2127,scaleY:1.2127,y:527.55},0).wait(1).to({regX:770.5,regY:536.1,scaleX:1,scaleY:1,x:789.45,y:554.75},0).wait(57).to({regX:724.9,regY:473.1,scaleX:2.1453,scaleY:2.1453,x:782.1,y:527.5},0).wait(15).to({regX:725.1,regY:473.8,scaleX:2.1391,scaleY:2.1391,x:781.85},0).wait(6).to({regX:770.5,regY:536.1,scaleX:1,scaleY:1,x:827.3,y:589.8},0).wait(10).to({regX:725.1,regY:473.8,scaleX:2.1391,scaleY:2.1391,x:781.85,y:527.5},0).wait(33).to({regX:784.5,regY:547.8,scaleX:0.9565,scaleY:0.9565,x:781.9},0).wait(1).to({regX:770.5,regY:536.1,scaleX:1,scaleY:1,x:767.95,y:515.85},0).wait(6).to({regX:784.5,regY:547.8,scaleX:0.9565,scaleY:0.9565,x:781.9,y:527.5},0).wait(58).to({regX:770.5,regY:536.1,scaleX:1,scaleY:1,x:767.95,y:515.85},0).wait(4).to({regX:784.5,regY:547.8,scaleX:0.9565,scaleY:0.9565,x:781.9,y:527.5},0).wait(132).to({_off:true},183).wait(53));

	// kneeL_obj_
	this.kneeL = new lib.Scene_1_kneeL();
	this.kneeL.name = "kneeL";
	this.kneeL.depth = 0;
	this.kneeL.isAttachedToCamera = 0
	this.kneeL.isAttachedToMask = 0
	this.kneeL.layerDepth = 0
	this.kneeL.layerIndex = 18
	this.kneeL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.kneeL).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(1).to({regX:560.7,regY:625.8,scaleX:1,scaleY:1,x:229.25,y:415.2},0).wait(6).to({regX:135.2,regY:95.2,scaleX:1.2535,scaleY:1.2535,x:0,y:0.05},0).wait(127).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,y:0},0).wait(1).to({regX:560.7,regY:625.8,scaleX:1,scaleY:1,x:593.65,y:629.5},0).wait(24).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(1).to({regX:560.7,regY:625.8,scaleX:1,scaleY:1,x:593.65,y:629.5},0).wait(12).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(1).to({regX:560.7,regY:625.8,scaleX:1,scaleY:1,x:593.65,y:629.5},0).wait(15).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(4).to({regX:560.7,regY:625.8,scaleX:1,scaleY:1,x:593.65,y:629.5},0).wait(16).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(14).to({_off:true},183).wait(53));

	// kneeR_obj_
	this.kneeR = new lib.Scene_1_kneeR();
	this.kneeR.name = "kneeR";
	this.kneeR.depth = 0;
	this.kneeR.isAttachedToCamera = 0
	this.kneeR.isAttachedToMask = 0
	this.kneeR.layerDepth = 0
	this.kneeR.layerIndex = 19
	this.kneeR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.kneeR).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(12).to({regX:-4.9,regY:12.7,scaleX:0.9958,scaleY:0.9958,x:0,y:0},0).wait(1).to({regX:772.7,regY:645.6,scaleX:1,scaleY:1,x:777.6,y:632.9},0).wait(33).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(3).to({regX:772.7,regY:645.6,scaleX:1,scaleY:1,x:805.65,y:649.3},0).wait(16).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(13).to({regX:772.7,regY:645.6,scaleX:1,scaleY:1,x:805.65,y:649.3},0).wait(15).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(129).to({_off:true},180).wait(56));

	// thighL_obj_
	this.thighL = new lib.Scene_1_thighL();
	this.thighL.name = "thighL";
	this.thighL.depth = 0;
	this.thighL.isAttachedToCamera = 0
	this.thighL.isAttachedToMask = 0
	this.thighL.layerDepth = 0
	this.thighL.layerIndex = 20
	this.thighL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.thighL).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(1).to({regX:607.4,regY:582.7,scaleX:1,scaleY:1,x:275.95,y:372.1},0).wait(6).to({regX:135.2,regY:95.2,scaleX:1.2535,scaleY:1.2535,x:0,y:0.05},0).wait(127).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,y:0},0).wait(1).to({regX:607.4,regY:582.7,scaleX:1,scaleY:1,x:640.35,y:586.4},0).wait(24).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(33).to({regX:607.4,regY:582.7,scaleX:1,scaleY:1,x:640.35,y:586.4},0).wait(16).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(14).to({_off:true},183).wait(53));

	// thighR_obj_
	this.thighR = new lib.Scene_1_thighR();
	this.thighR.name = "thighR";
	this.thighR.depth = 0;
	this.thighR.isAttachedToCamera = 0
	this.thighR.isAttachedToMask = 0
	this.thighR.layerDepth = 0
	this.thighR.layerIndex = 21
	this.thighR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.thighR).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(12).to({regX:-4.9,regY:12.7,scaleX:0.9958,scaleY:0.9958,x:0,y:0},0).wait(1).to({regX:742.2,regY:594.7,scaleX:1,scaleY:1,x:747.1,y:582},0).wait(13).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(52).to({regX:742.2,regY:594.7,scaleX:1,scaleY:1,x:775.15,y:598.4},0).wait(18).to({regX:-33,regY:-3.7,scaleX:0.9565,scaleY:0.9565,x:0,y:0},0).wait(126).to({_off:true},187).wait(49));

	// armR_obj_
	this.armR = new lib.Scene_1_armR();
	this.armR.name = "armR";
	this.armR.setTransform(775.4,481.7,1,1,0,0,0,775.4,481.7);
	this.armR.depth = 0;
	this.armR.isAttachedToCamera = 0
	this.armR.isAttachedToMask = 0
	this.armR.layerDepth = 0
	this.armR.layerIndex = 22
	this.armR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.armR).wait(135).to({regX:722.1,regY:452.4,scaleX:2.1391,scaleY:2.1391,x:775.45},0).wait(49).to({regX:777.6,regY:499.9,scaleX:0.9565,scaleY:0.9565,x:775.3},0).wait(1).to({regX:761.6,regY:494.4,scaleX:1,scaleY:1,x:759.35,y:476.25},0).wait(6).to({regX:777.6,regY:499.9,scaleX:0.9565,scaleY:0.9565,x:775.3,y:481.7},0).wait(194).to({_off:true},183).wait(53));

	// handR_obj_
	this.handR = new lib.Scene_1_handR();
	this.handR.name = "handR";
	this.handR.setTransform(754.1,428.1,1,1,0,0,0,754.1,428.1);
	this.handR.depth = 0;
	this.handR.isAttachedToCamera = 0
	this.handR.isAttachedToMask = 0
	this.handR.layerDepth = 0
	this.handR.layerIndex = 23
	this.handR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.handR).wait(135).to({regX:712.1,regY:427.3,scaleX:2.1391,scaleY:2.1391,x:754.05,y:428.05},0).wait(49).to({regX:755.4,regY:443.8,scaleX:0.9565,scaleY:0.9565,x:754.1},0).wait(1).to({regX:745.8,regY:435.3,scaleX:1,scaleY:1,x:744.5,y:419.6},0).wait(6).to({regX:755.4,regY:443.8,scaleX:0.9565,scaleY:0.9565,x:754.1,y:428.05},0).wait(194).to({_off:true},183).wait(53));

	// fingersLEFT_obj_
	this.fingersLEFT = new lib.Scene_1_fingersLEFT();
	this.fingersLEFT.name = "fingersLEFT";
	this.fingersLEFT.setTransform(540.1,449.7,1,1,0,0,0,540.1,449.7);
	this.fingersLEFT.depth = 0;
	this.fingersLEFT.isAttachedToCamera = 0
	this.fingersLEFT.isAttachedToMask = 0
	this.fingersLEFT.layerDepth = 0
	this.fingersLEFT.layerIndex = 24
	this.fingersLEFT.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fingersLEFT).wait(61).to({regX:561.8,regY:445.1,scaleX:1.1932,scaleY:1.1932,x:540.2,y:449.75},0).wait(1).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:557.7,y:508.4},0).wait(59).to({regX:612.1,regY:436.9,scaleX:2.1443,scaleY:2.1443,x:540.2,y:449.7},0).wait(14).to({regY:437.4,scaleX:2.1391,scaleY:2.1391,x:540.15,y:449.65},0).wait(16).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:507.35,y:516.05},0).wait(6).to({regX:612.1,regY:437.4,scaleX:2.1391,scaleY:2.1391,x:540.15,y:449.65},0).wait(19).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1},0).wait(79).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(9).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(1).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(3).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(2).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(2).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(1).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(6).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(1).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(12).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(22).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(8).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(32).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(17).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(1).to({regX:579.3,regY:503.8,scaleX:1,scaleY:1,x:587.7,y:487.1},0).wait(5).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1,y:449.65},0).wait(8).to({_off:true},186).wait(50));

	// armL_obj_
	this.armL = new lib.Scene_1_armL();
	this.armL.name = "armL";
	this.armL.setTransform(567.6,469.4,1,1,0,0,0,567.6,469.4);
	this.armL.depth = 0;
	this.armL.isAttachedToCamera = 0
	this.armL.isAttachedToMask = 0
	this.armL.layerDepth = 0
	this.armL.layerIndex = 25
	this.armL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.armL).wait(129).to({regX:625,regY:446.7,scaleX:2.1391,scaleY:2.1391,x:567.75,y:469.55},0).wait(47).to({regX:560.4,regY:487.1,scaleX:0.9565,scaleY:0.9565,x:567.55,y:469.45},0).wait(79).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:595.55,y:483.8},0).wait(9).to({regX:560.4,regY:487.1,scaleX:0.9565,scaleY:0.9565,x:567.55,y:469.45},0).wait(6).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:595.55,y:483.8},0).wait(2).to({regX:560.4,regY:487.1,scaleX:0.9565,scaleY:0.9565,x:567.55,y:469.45},0).wait(13).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:595.55,y:483.8},0).wait(7).to({regX:560.4,regY:487.1,scaleX:0.9565,scaleY:0.9565,x:567.55,y:469.45},0).wait(22).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:595.55,y:483.8},0).wait(8).to({regX:560.4,regY:487.1,scaleX:0.9565,scaleY:0.9565,x:567.55,y:469.45},0).wait(32).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:595.55,y:483.8},0).wait(17).to({regX:560.4,regY:487.1,scaleX:0.9565,scaleY:0.9565,x:567.55,y:469.45},0).wait(14).to({_off:true},159).wait(77));

	// Theater_obj_
	this.Theater = new lib.Scene_1_Theater();
	this.Theater.name = "Theater";
	this.Theater.setTransform(633.7,320.2,1,1,0,0,0,633.7,320.2);
	this.Theater.depth = 0;
	this.Theater.isAttachedToCamera = 0
	this.Theater.isAttachedToMask = 0
	this.Theater.layerDepth = 0
	this.Theater.layerIndex = 26
	this.Theater.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Theater).wait(417).to({regX:629.6,regY:331.1,scaleX:0.9565,scaleY:0.9565,x:633.75,y:320.25},0).wait(177).to({regX:880.6,regY:331.6,scaleX:4.3951,scaleY:4.3951,x:634,y:320.4},0).wait(1).to({regX:880.9,regY:331.1,scaleX:4.4299,scaleY:4.4299,x:633.95,y:320.3},0).wait(26));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-203,-440,1841.4,1627.7);
// library properties:
lib.properties = {
	id: 'B95836BBD65BC34C954EB318E557F9E8',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#666666",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_11.png?1618067788703", id:"CachedBmp_11"},
		{src:"images/CachedBmp_9.png?1618067788703", id:"CachedBmp_9"},
		{src:"images/CachedBmp_8.png?1618067788703", id:"CachedBmp_8"},
		{src:"images/CachedBmp_23.png?1618067788703", id:"CachedBmp_23"},
		{src:"images/CachedBmp_6.png?1618067788703", id:"CachedBmp_6"},
		{src:"images/CachedBmp_5.png?1618067788703", id:"CachedBmp_5"},
		{src:"images/CachedBmp_4.png?1618067788703", id:"CachedBmp_4"},
		{src:"images/CachedBmp_3.png?1618067788703", id:"CachedBmp_3"},
		{src:"images/CachedBmp_2.png?1618067788703", id:"CachedBmp_2"},
		{src:"images/pincchio_atlas_1.png?1618067788026", id:"pincchio_atlas_1"},
		{src:"sounds/SOUNDpinocchio_1.mp3?1618067788703", id:"SOUNDpinocchio_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B95836BBD65BC34C954EB318E557F9E8'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;