package com.sensorsimulator;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;

public class SensorModule extends ReactContextBaseJavaModule implements SensorEventListener {

    private SensorManager mSensorManager;
    private HashMap<Integer, Sensor> sensors = new HashMap<>();
    private HashMap<Integer, Long> lastTime = new HashMap<>();
    private int delay = 1000;
    private ReactApplicationContext reactContext;
    public SensorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        mSensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
    }
    private Sensor getSensor(int type){
        Sensor tmp = sensors.get(type);
        Log.d("SENSOR TYPE:", type+"");
        if(tmp == null){
            tmp = mSensorManager.getDefaultSensor(type);
            lastTime.put(type, 0l);
            sensors.put(type, tmp);
        }
        return tmp;
    }
    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    @Override
    public String getName() {
        return "SensorModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("ACELEROMETER", Sensor.TYPE_ACCELEROMETER);
        constants.put("LIGHT", Sensor.TYPE_LIGHT);
        constants.put("AMBIENT_TEMPERATURE", Sensor.TYPE_AMBIENT_TEMPERATURE);
        constants.put("GYROSCOPE", Sensor.TYPE_GYROSCOPE);
        constants.put("MAGNETIC_FIELD", Sensor.TYPE_MAGNETIC_FIELD);
        constants.put("PROXIMITY", Sensor.TYPE_PROXIMITY);
        constants.put("GRAVITY", Sensor.TYPE_GRAVITY);
        constants.put("STEP_DETECTOR", Sensor.TYPE_STEP_DETECTOR);
        constants.put("STEP_COUNTER", Sensor.TYPE_STEP_COUNTER);
        return constants;
    }

    @ReactMethod
    public void startSensor(int sensorType) {
        mSensorManager.registerListener(this, getSensor(sensorType), SensorManager.SENSOR_DELAY_FASTEST);
    }
    @ReactMethod
    public void stopSensor(int sensorType) {

        mSensorManager.unregisterListener(this, getSensor(sensorType));

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if(sensors.containsKey(event.sensor.getType())) {
            long _last = lastTime.get(event.sensor.getType());
            long current = new Date().getTime();
            if(_last+delay < current) {
                lastTime.put(event.sensor.getType(), current);
                WritableArray values = new WritableNativeArray();
                for (int i = 0; i < event.values.length; i++) {
                    values.pushDouble(event.values[i]);
                }
                WritableMap map = Arguments.createMap();
                map.putArray("values", values);
                map.putInt("type", event.sensor.getType());
                sendEvent(reactContext, "SensorChanged", map);
            }
        }
    }
}