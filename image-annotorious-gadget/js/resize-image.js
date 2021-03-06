(function() {
  var imageAnnotationGadget;

  imageAnnotationGadget = window.imageAnnotationGadget || {};

  window.imageAnnotationGadget = imageAnnotationGadget;

  jQuery(document).ready(function($) {
    var imageSizeHasChanged, makeEditorVisibleOnBoundariesOfImage, makeImageResizable, makeImageResizableOnLoad, redrawAnnotations, redrawAnnotationsForNewSize, removeAnnotationTextDivs, resizeAnnotoriousLayers, setElementsToSize, setNewScrollPositionAfterResize;
    imageAnnotationGadget.setImageSizeAndRedrawAnnotations = function(newImageSize) {
      if (imageSizeHasChanged(newImageSize)) {
        imageAnnotationGadget.setImageSize(newImageSize);
        return redrawAnnotationsForNewSize(newImageSize);
      }
    };
    imageSizeHasChanged = function(newImageSize) {
      var image;
      image = $('#imageToAnnotate');
      return image.width() !== newImageSize.width || image.height() !== newImageSize.height;
    };
    imageAnnotationGadget.setImageSize = function(imageSize) {
      var imageAndResizableWrapper;
      imageAndResizableWrapper = $('#imageToAnnotate, #imageDiv');
      setElementsToSize(imageAndResizableWrapper, imageSize);
      return imageAnnotationGadget.adjustGadgetHeightForImage();
    };
    makeImageResizableOnLoad = function() {
      return $('#imageToAnnotate').load(makeImageResizable);
    };
    makeImageResizable = function() {
      $('#imageDiv').resizable({
        aspectRatio: true,
        alsoResize: '#imageToAnnotate',
        minWidth: 350,
        resize: function(event, ui) {
          imageAnnotationGadget.adjustGadgetHeightForImage();
          return redrawAnnotationsForNewSize(ui.size);
        },
        stop: function(event, ui) {
          return imageAnnotationGadget.wave.saveNewImageSize(ui.size);
        }
      });
      return makeEditorVisibleOnBoundariesOfImage();
    };
    redrawAnnotationsForNewSize = function(size) {
      resizeAnnotoriousLayers(size);
      return redrawAnnotations();
    };
    resizeAnnotoriousLayers = function(newSize) {
      var annotoriousElementsToResize;
      annotoriousElementsToResize = $('.annotorious-annotationlayer, \
    canvas.annotorious-opacity-fade');
      return setElementsToSize(annotoriousElementsToResize, newSize);
    };
    setElementsToSize = function(elements, size) {
      var element, _i, _len, _results;
      elements.width(size.width);
      elements.height(size.height);
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        if (element.width != null) {
          element.width = size.width;
        }
        if (element.height != null) {
          _results.push(element.height = size.height);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    redrawAnnotations = function() {
      var annotation, oldAnnotations, _i, _len, _results;
      oldAnnotations = anno.getAnnotations();
      removeAnnotationTextDivs();
      _results = [];
      for (_i = 0, _len = oldAnnotations.length; _i < _len; _i++) {
        annotation = oldAnnotations[_i];
        if (annotation != null) {
          anno.removeAnnotation(annotation);
          _results.push(imageAnnotationGadget.addAnnotationWithText(annotation));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    removeAnnotationTextDivs = function() {
      return $('.annotationTextDiv').remove();
    };
    setNewScrollPositionAfterResize = function(ui) {
      var widthDifference;
      widthDifference = ui.size.width - ui.originalSize.width;
      return $('#imageDiv').scrollLeft(scrollBeforeResize + widthDifference);
    };
    makeEditorVisibleOnBoundariesOfImage = function() {
      return $('.ui-wrapper').css('overflow', '');
    };
    return makeImageResizableOnLoad();
  });

}).call(this);
