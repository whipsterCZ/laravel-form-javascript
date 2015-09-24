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

    laravel.form.init = function(form) {
        form = form || document;
        laravel.form.focusErrorField(form);
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
    laravel.form.init(document);

    return laravel;
})(laravel || {}, jQuery);