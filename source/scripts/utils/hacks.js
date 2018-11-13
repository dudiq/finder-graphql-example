import OSdetails from './OSdetails';

if (OSdetails.OStype() == OSdetails.TYPE_IOS) {
    // IOS scales for mobile devices
    document.addEventListener('touchmove', function (event) {
        event = event.originalEvent || event;
        if (event.scale > 1) {
            event.preventDefault();
        }
    }, false);
}
