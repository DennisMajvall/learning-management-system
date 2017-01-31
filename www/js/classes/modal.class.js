class Modal {

  show(settings){
    settings.id = settings.id || 'defaultModal';
    $('#' + settings.id).remove();
    $('body').template('modal',settings);
    $('#' + settings.id).modal('show');
    $('#' + settings.id + ' .save-btn').click(settings.save);
    $('#' + settings.id).on('shown.bs.modal',()=>{
      $('#' + settings.id + ' input').first().focus()
    });
    return $('#' + settings.id);
  }

}