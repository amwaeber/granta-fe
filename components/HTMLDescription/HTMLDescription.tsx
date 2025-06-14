import React from 'react';
import RenderHTML from 'react-native-render-html';
import { Linking, useWindowDimensions } from 'react-native';


interface props {
    htmlContent: string;
}

export default function HTMLDescription({htmlContent}: props) {
    const {width} = useWindowDimensions();

    return (
        <RenderHTML
            contentWidth={width}
            source={{html: htmlContent}}
            renderersProps={{
                a: {
                    onPress: (_, href) => {
                        if (/^(https?|mailto):/.test(href)) {
                            Linking.openURL(href);
                        } else {
                            console.warn("Blocked unsafe link:", href);
                        }
                    }
                }
            }}
            tagsStyles={{
                a: {
                    color: 'blue',
                    textDecorationLine: 'underline',
                },
            }}
            ignoredDomTags={['script', 'style', 'img']}
            ignoredStyles={['display']}
        />
    );
};