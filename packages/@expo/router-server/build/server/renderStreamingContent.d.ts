/**
 * Copyright © 2026 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type ReactNode } from 'react';
export type GetStreamingContentOptions = {
    loader?: {
        data?: any;
        /** Unique key for the route. Derived from the route's contextKey */
        key: string;
    };
    metadata?: {
        headNodes: ReactNode[];
    } | null;
    request?: Request;
    /** Assets for hydration bundles and development-only inline CSS. */
    assets?: {
        css: string[];
        /** CSS source to inline into the document head, used by development SSR. */
        inlineCss?: {
            source: string;
            hmrId?: string;
        }[];
        js: string[];
        /** Public href of a favicon generated from `web.favicon` in the app config. */
        favicon?: string;
    };
    /**
     * Render output shape, mirroring `web.output` from the Expo app config.
     * - `'server'` (default): a `ReadableStream<Uint8Array>` for progressive SSR.
     * - `'static'`: the fully-rendered HTML string, for build-time SSG.
     */
    output?: 'static' | 'server';
    /**
     * Whether to embed the `__EXPO_ROUTER_HYDRATE__` flag in the bootstrap script. Defaults to
     * `true`.
     */
    hydrate?: boolean;
};
/**
 * Streaming SSR renderer using `renderToReadableStream`. Returns a web `ReadableStream`
 * that emits the full HTML document with head injections applied.
 */
export declare function getStreamingContent(location: URL, options: GetStreamingContentOptions & {
    output: 'static';
}): Promise<string>;
export declare function getStreamingContent(location: URL, options?: GetStreamingContentOptions & {
    output?: 'server';
}): Promise<ReadableStream<Uint8Array>>;
export { resolveMetadata } from './metadata';
//# sourceMappingURL=renderStreamingContent.d.ts.map