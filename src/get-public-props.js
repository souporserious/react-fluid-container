export default function getPublicProps(allowedProps, privateProps) {
  var publicProps = {}
  for (var key in allowedProps) {
    if (allowedProps.hasOwnProperty(key) && !privateProps[key]) {
      publicProps[key] = allowedProps[key]
    }
  }
  return publicProps;
}
