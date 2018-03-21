package com.contactos;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.ImageView;
import android.view.Gravity;
import android.util.TypedValue;
import android.view.Window;
import android.view.WindowManager;
import android.view.ViewGroup;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
	@Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        ImageView imageView = new ImageView(this);
		Window window = getWindow();
	    int globalColor = Color.parseColor("#000000");
        int imageMeasurements = 256;

		window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
		window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
		window.setStatusBarColor(globalColor);

        view.setBackgroundColor(globalColor);
        view.setGravity(Gravity.CENTER);

        imageView.setImageDrawable(getResources().getDrawable(R.drawable.icon));
        imageView.setLayoutParams(
            new ViewGroup.LayoutParams(
                imageMeasurements,      
                imageMeasurements
            ) 
        );

        view.addView(imageView);
        return view;
    }
}
