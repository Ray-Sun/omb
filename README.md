# omb
the hybird mobile app, dev with ionic

# Plugin install
* [@ionic-native/http](https://ionicframework.com/docs/native/http)
  ```bash
    ionic cordova plugin add cordova-plugin-advanced-http
    npm install @ionic-native/http
  ```
* [@ionic-native/native-storage](https://ionicframework.com/docs/native/native-storage)
  ```bash
    ionic cordova plugin add cordova-plugin-nativestorage
    npm install @ionic-native/native-storage
  ```

/src/config.ts
APPKEY should be the same with [billboard](https://github.com/Ray-Sun/billboard)
```javascript
export const APPKEY = 'token';
export const RequestConfig = {
    Host:'https://yourwebsite.com'
};
```