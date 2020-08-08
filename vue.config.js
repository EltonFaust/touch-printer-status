module.exports = {
    publicPath: '',
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "@/scss/_base.scss";
                $production: ${process.env.NODE_ENV === 'production' ? 'true' : 'false'};
                `,
            },
        },
    },
};
