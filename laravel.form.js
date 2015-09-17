/**
 * Laravel Form Validation
 *
 * Error @section should look like
 @if ($errors->any())
     <div class="alert alert-danger">
         <ul>
         @foreach ($errors->getBags('default') as $bagName => $bag)
             @foreach($bag->toArray() as $key => $errors)
                 @foreach($errors as $error)
                 <li data-bag="{{$bagName}}" data-name="{{$key}}">{{ $error }}</li>
                 @endforeach
             @endforeach
         @endforeach
         </ul>
     </div>
 @endif
 *
 * @dependency CSS BOOTSRAP >=3 *
 * @auor Daniel Kouba whipstercz@gmail.com
 */
var laravel = (function(laravel,$) {
    laravel.form = {};
    laravel.errors = laravel.errors || {};
    laravel.errors.errorBagContainer = laravel.errors.errorBagContainer || $('#errors');
    laravel.errors.showErrorsInFormGroup = laravel.errors.showErrorsInFormGroup || false;

    laravel.form.init = function(form) {
        form = form || document;
        laravel.form.focusErrorField(form);
        laravel.form.renderValidation(form);
    };


    laravel.form.renderValidation = function (form) {
        form = form || document;

        if ( laravel.errors.hasErrorsInContainer() ) {
            var errors = laravel.form.errors();

            errors.forEach(function(error){
                var fieldName = error.name;
                var fieldErrors = error.messages;
                //console.info(fieldName,fieldErrors[0],form);
                laravel.form.renderValidationFormGroup(fieldName,fieldErrors,form);
            });
        }
    };
    laravel.errors.hasErrorsInContainer = function(){
        return laravel.errors.errorBagContainer.find('li').length > 0;
    };
    laravel.form.errors = function(){
        var errors = [];
        if ( laravel.errors.hasErrorsInContainer() ) {
            laravel.errors.errorBagContainer.find('li').each(function(){
                var name = $(this).attr('data-name');
                var message = $(this).text();
                if ( name && message) {
                    var error = { name: name, messages:[message] }
                }
                errors.push(error);
            });
        }
        return errors;
    };
    laravel.form.focusErrorField = function(form) {
        form = form || document;
        if ( laravel.errors.hasErrorsInContainer() ) {
            var errors = laravel.form.errors();
            var firstField = errors[0].name;
            if (firstField && laravel.form.field(firstField,form).length > 0 ) {
                laravel.form.field(firstField,form).focus();
            }
        }
    };
    laravel.form.field = function(name,form){
        form = form || document;
        var field = $(form).find('[name="'+name+'"]');
        if ( field.length == 0) {
            field = $(form).find('[name="'+name+'[]"]');
        }
        if ( field.length == 0) {
            field = $(form).find('#'+name);
        }
        return field;
    };
    laravel.form.renderValidationFormGroup = function(fieldName,errors,form) {
        form = form || document;
        var field = laravel.form.field(fieldName,form);
        //var formGroup =  field.closest('.form-group');
        var formGroup = field.parent();
        //console.info(fieldName,errors,field,form);

        //add form group error class
        formGroup.addClass('has-error');
        //add form group error message
        if ( laravel.errors.showErrorsInFormGroup ) {
            var $span = formGroup.find('.help-block');
            if ($span.length == 0) {
                $span = $('<span class="help-block"></span>');
                formGroup.append($span);
            }
            $span.text(errors.join(', '));
        }
    };

    laravel.form.init(document);

    return laravel;
})(laravel || {}, jQuery);